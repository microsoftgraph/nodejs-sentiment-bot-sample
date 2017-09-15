import { IDialog } from './idialog';
import * as builder from 'botbuilder';
import * as restify from 'restify';
import { AuthHelper } from '../helpers/authHelper';
//import { HttpHelper } from '../helpers/httpHelper';
import { SentimentHelper } from '../helpers/sentimentHelper';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"
import * as MicrosoftGraphClient from "@microsoft/microsoft-graph-client"

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
                    // Make a call to Microsoft Graph to search messages
                    // using the Microsoft Graph SDK and Typings library.
                    var client = MicrosoftGraphClient.Client.init({
                        authProvider: (done) => {
                            done(null, results.response);
                        }
                    });
                    
                    let searchQuery = `$search="${encodeURIComponent(this.term.entity)}"`;
                    var messages:MicrosoftGraph.Message[];

                    // Use the Microsoft Graph Client (SDK) to search for the term inside me/messages
                    // and to select the body preview property of each returned message.
                    // Cap the result set at 5.
                    client
                    .api('me/messages')
                    .top(5)
                    .query(searchQuery)
                    .select('bodyPreview')
                    .get()
                    .then((res) => {
                        messages =  res.value;
                        let text = [];
                        for (var i = 0; i < messages.length; i++) {
                            text.push(messages[i].bodyPreview);
                        }
                        // use the sentiment helper to get sentiment score for the messages
                        SentimentHelper.getSentimentScore(text).then((score) => {
                            session.endConversation(`Sentiment Score: ${score}`);
                        }, (err) => {
                            session.endConversation(`Error occurred: ${err}`);
                        });
                        }).catch((err) => {
                            console.log(err);
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