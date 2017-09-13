require('dotenv').config();

import * as fs from 'fs';
import * as path from 'path';
import * as expressSession from 'express-session';
import * as restify from 'restify';
import * as builder from 'botbuilder';
import {AuthHelper} from './helpers/AuthHelper';
import searchDialog from './dialogs/searchDialog';

export class Server {
    run() {
        // create the server and initialize the bot
        var https_options = {
            key: fs.readFileSync(path.join(__dirname, '../etc/ssl/server.key')),
            certificate: fs.readFileSync(path.join(__dirname, '../etc/ssl/server.crt'))
        };
        const server = restify.createServer(https_options);
        const bot = new builder.UniversalBot(
            new builder.ChatConnector({
                //appId: process.env.MICROSOFT_APP_ID,
                //appPassword: process.env.MICROSOFT_APP_PASSWORD
            })
        );

        // set the bot to listen on /api/messages endpoint
        server.post('/api/messages', (bot.connector('*') as builder.ChatConnector).listen());
        server.listen(process.env.PORT, () => console.log(`${server.name} listening to ${server.url}`));
        server.get('/code', restify.serveStatic({
            'directory': path.join(__dirname, '../public'),
            'file': 'code.html'
        }));

        // configure bot to leverage LUIS
        bot.recognizer(new builder.LuisRecognizer(process.env.LUIS_MODEL_URL));

        // create authHelper
        server.use(restify.queryParser());
        server.use(restify.bodyParser());
        server.use(expressSession({ secret: 'SOME_SECRET', resave: true, saveUninitialized: false }));
        const authHelper = new AuthHelper(server, bot);

        // create dialogs for specific intents
        let dlg = new searchDialog(authHelper);
        bot.dialog('/', [
            function (session, args, next) {
                session.send('No intent matched');
            }
        ]);
        bot.dialog(dlg.id, dlg.waterfall).triggerAction({ matches: dlg.name });
    }
}

const server = new Server();

server.run();