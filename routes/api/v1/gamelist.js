var request = require('request');

/*
 * GET game lists.
 */

exports.list = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    request.get('http://sportselect.wclc.com/Game-Lists.htm', function (error, response, body) {
        
        res.end(JSON.stringify({ result: 1 }));
    });
};