require('dotenv').config();

import * as https from 'https';
import { HttpHelper } from './httpHelper';

export class SentimentHelper {
    // get sentiment score for all strings in the array
    static getSentimentScore(text: Array<string>) {
        return new Promise((resolve, reject) => {
            // set header information, including cognitive services subscription key
            let header = {
                'Ocp-Apim-Subscription-Key': process.env.COG_SUB_KEY,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

            // prepare the payload for the text analytics service
            let payload = {documents: []};
            for (var i = 0; i < text.length; i++)
                payload.documents.push({
                    "language": "en",
                    "id": i,
                    "text": text[i]
                });
            
            // use the HttpHelper to post the payload and get back sentiment
            HttpHelper.postJson(header, 'westus.api.cognitive.microsoft.com', '/text/analytics/v2.0/sentiment', payload).then((data: any) => {
                // aggregate the total sentiment score
                let totalScore = 0.0;
                for (var i = 0; i < data.documents.length; i++) {
                    totalScore += data.documents[i].score;
                }

                // resolve the total score divided by the number of results
                resolve(totalScore / data.documents.length);
            }, (err) => {
                reject(err);
            });         
        });
    }
}