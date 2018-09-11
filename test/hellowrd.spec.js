var assert = require("assert");
var http = require("http");
var server = require("../helloworld");


describe('Simple HTTP Server functionality', () => {
    after(() => {
        process.exit();
    });

    it("Should response with status 200 and body Hello world", () => {
        http.get("http://127.0.0.1:8085", (res) => {
            var statusCode = res.statusCode;
            assert.equal(statusCode, 200);
            if(200 == statusCode) {
                assert.equal(res.headers['content-type'], "plain/text");
                res.setEncoding("utf8");
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    assert.equal(rawData, "Hello World!");
                });
            }
        });
    });
});