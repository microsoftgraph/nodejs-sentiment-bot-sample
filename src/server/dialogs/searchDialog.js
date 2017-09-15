"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder = require("botbuilder");
const sentimentHelper_1 = require("../helpers/sentimentHelper");
const MicrosoftGraphClient = require("@microsoft/microsoft-graph-client");
class searchDialog {
    constructor(authHelper) {
        this.authHelper = authHelper;
        this.id = 'Search';
        this.name = 'Search';
        this.waterfall = [].concat((session, args, next) => {
            this.term = builder.EntityRecognizer.findEntity(args.intent.entities, 'Term');
            this.source = builder.EntityRecognizer.findEntity(args.intent.entities, 'Source');
            next();
        }, authHelper.getAccessToken(), (session, results, next) => {
            if (results.response != null) {
                var client = MicrosoftGraphClient.Client.init({
                    authProvider: (done) => {
                        done(null, results.response);
                    }
                });
                let searchQuery = `$search="${encodeURIComponent(this.term.entity)}"`;
                var messages;
                client
                    .api('me/messages')
                    .top(5)
                    .query(searchQuery)
                    .select('bodyPreview')
                    .get()
                    .then((res) => {
                    messages = res.value;
                    let text = [];
                    for (var i = 0; i < messages.length; i++) {
                        text.push(messages[i].bodyPreview);
                    }
                    sentimentHelper_1.SentimentHelper.getSentimentScore(text).then((score) => {
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
        });
    }
}
exports.searchDialog = searchDialog;
exports.default = searchDialog;
//# sourceMappingURL=searchDialog.js.map