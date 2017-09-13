"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder = require("botbuilder");
const httpHelper_1 = require("../helpers/httpHelper");
const sentimentHelper_1 = require("../helpers/sentimentHelper");
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
                let headers = {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + results.response
                };
                let endpoint = `/v1.0/me/messages?$search="${encodeURIComponent(this.term.entity)}"&$select=bodyPreview&$top=5`;
                httpHelper_1.HttpHelper.getJson(headers, 'graph.microsoft.com', endpoint).then(function (data) {
                    let text = [];
                    for (var i = 0; i < data.value.length; i++) {
                        text.push(data.value[i].bodyPreview);
                    }
                    sentimentHelper_1.SentimentHelper.getSentimentScore(text).then((score) => {
                        session.endConversation(`Sentiment Score: ${score}`);
                    }, (err) => {
                        session.endConversation(`Error occurred: ${err}`);
                    });
                }).catch(function (err) {
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