"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
class HttpHelper {
    static getJson(headers, host, path) {
        return new Promise((resolve, reject) => {
            var options = {
                host: host,
                path: path,
                method: 'GET',
                headers: headers
            };
            https.get(options, function (response) {
                var body = '';
                response.on('data', function (d) {
                    body += d;
                });
                response.on('end', function () {
                    var error;
                    if (response.statusCode === 200) {
                        resolve(JSON.parse(body));
                    }
                    else {
                        error = new Error();
                        error.code = response.statusCode;
                        error.message = response.statusMessage;
                        error.innerError = body.trim();
                        reject(error);
                    }
                });
            }).on('error', function (err) {
                reject(err);
            });
        });
    }
    static postJson(headers, host, path, payload) {
        return new Promise((resolve, reject) => {
            var options = {
                host: host,
                path: path,
                method: 'POST',
                headers: headers
            };
            let post_req = https.request(options, function (response) {
                var body = '';
                response.on('data', function (d) {
                    body += d;
                });
                response.on('end', function () {
                    var error;
                    if (response.statusCode === 200) {
                        resolve(JSON.parse(body));
                    }
                    else {
                        error = new Error();
                        error.code = response.statusCode;
                        error.message = response.statusMessage;
                        error.innerError = body.trim();
                        reject(error);
                    }
                });
            }).on('error', function (err) {
                reject(err);
            });
            post_req.write(JSON.stringify(payload));
            post_req.end();
        });
    }
}
exports.HttpHelper = HttpHelper;
//# sourceMappingURL=httpHelper.js.map