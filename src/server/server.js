"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const fs = require("fs");
const path = require("path");
const expressSession = require("express-session");
const restify = require("restify");
const builder = require("botbuilder");
const AuthHelper_1 = require("./helpers/AuthHelper");
const searchDialog_1 = require("./dialogs/searchDialog");
class Server {
    run() {
        var https_options = {
            key: fs.readFileSync(path.join(__dirname, '../etc/ssl/server.key')),
            certificate: fs.readFileSync(path.join(__dirname, '../etc/ssl/server.crt'))
        };
        const server = restify.createServer(https_options);
        const bot = new builder.UniversalBot(new builder.ChatConnector({}));
        server.post('/api/messages', bot.connector('*').listen());
        server.listen(process.env.PORT, () => console.log(`${server.name} listening to ${server.url}`));
        server.get('/code', restify.serveStatic({
            'directory': path.join(__dirname, '../public'),
            'file': 'code.html'
        }));
        bot.recognizer(new builder.LuisRecognizer(process.env.LUIS_MODEL_URL));
        server.use(restify.queryParser());
        server.use(restify.bodyParser());
        server.use(expressSession({ secret: 'SOME_SECRET', resave: true, saveUninitialized: false }));
        const authHelper = new AuthHelper_1.AuthHelper(server, bot);
        let dlg = new searchDialog_1.default(authHelper);
        bot.dialog('/', [
            function (session, args, next) {
                session.send('No intent matched');
            }
        ]);
        bot.dialog(dlg.id, dlg.waterfall).triggerAction({ matches: dlg.name });
    }
}
exports.Server = Server;
const server = new Server();
server.run();
//# sourceMappingURL=server.js.map