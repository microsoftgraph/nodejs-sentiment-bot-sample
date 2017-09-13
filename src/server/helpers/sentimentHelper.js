"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const httpHelper_1 = require("./httpHelper");
class SentimentHelper {
    static getSentimentScore(text) {
        return new Promise((resolve, reject) => {
            let header = {
                'Ocp-Apim-Subscription-Key': process.env.COG_SUB_KEY,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
            let payload = { documents: [] };
            for (var i = 0; i < text.length; i++)
                payload.documents.push({
                    "language": "en",
                    "id": i,
                    "text": text[i]
                });
            httpHelper_1.HttpHelper.postJson(header, 'westus.api.cognitive.microsoft.com', '/text/analytics/v2.0/sentiment', payload).then((data) => {
                let totalScore = 0.0;
                for (var i = 0; i < data.documents.length; i++) {
                    totalScore += data.documents[i].score;
                }
                resolve(totalScore / data.documents.length);
            }, (err) => {
                reject(err);
            });
        });
    }
}
exports.SentimentHelper = SentimentHelper;
//# sourceMappingURL=sentimentHelper.js.map