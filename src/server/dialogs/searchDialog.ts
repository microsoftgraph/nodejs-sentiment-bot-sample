import { IDialog } from './idialog';
import * as builder from 'botbuilder';
import * as restify from 'restify';
import { AuthHelper } from '../helpers/authHelper';
import { HttpHelper } from '../helpers/httpHelper';
import { SentimentHelper } from '../helpers/sentimentHelper';

export class searchDialog implements IDialog {
    constructor(private authHelper: AuthHelper) {
        this.id = 'Search';
        this.name = 'Search';
        this.waterfall = [].concat(
            (session, args, next) => {
                // Read the LUIS detail and then move to auth
                this.term = builder.EntityRecognizer.findEntity(args.intent.entities, 'Term');
                this.source = builder.EntityRecognizer.findEntity(args.intent.entities, 'Source');
                next();                
            },
            authHelper.getAccessToken(),
            (session, results, next) => {
                if (results.response != null) {
                    // make a call to the Microsoft Graph to search messages
                    let headers = {
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + results.response
                    };
                    let endpoint = `/v1.0/me/messages?$search="${encodeURIComponent(this.term.entity)}"&$select=bodyPreview&$top=5`;
                    HttpHelper.getJson(headers, 'graph.microsoft.com', endpoint).then(function(data: any) {
                        // build string array with bodyPreview of each message
                        let text = [];
                        for (var i = 0; i < data.value.length; i++) {
                            text.push(data.value[i].bodyPreview);
                        }

                        // use the sentiment helper to get sentiment score for the messages
                        SentimentHelper.getSentimentScore(text).then((score) => {
                            session.endConversation(`Sentiment Score: ${score}`);
                        }, (err) => {
                            session.endConversation(`Error occurred: ${err}`);
                        });
                    }).catch(function(err) {
                        // something went wrong
                        session.endConversation(`Error occurred: ${err}`);
                    });
                }
                else {
                    session.endConversation('Sorry, I did not understand');
                }
            }
        );
    }
    
    id; name; waterfall; term; source;
}

export default searchDialog;