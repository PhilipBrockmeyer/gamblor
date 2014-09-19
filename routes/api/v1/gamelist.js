var request = require('request');
var jsdom = require('jsdom');

/*
 * GET game lists.
 */

exports.list = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    request.get('http://sportselect.wclc.com/Proline-Gamelist-html.htm', function (error, response, body) {
        jsdom.env(body, [], function (err, window) {
            var games = parseGamesFromSportSelect(window);
            res.end(JSON.stringify(games));
        });
    });
};

function parseGamesFromSportSelect(window) {
    var $ = require('jquery')(window);
    var games = [];
    $("[name='AMERICAN PROFESSIONAL FOOTBALL']").each(function (index, item) {
        var row = $(item).closest('tr');

        games.push(
            {
                gameDate: row.attr('gamedate'),
                gameNumber: row.find('td:nth-child(1)').text(),
                visitor: row.find('td:nth-child(4)').attr('name'),
                home: row.find('td:nth-child(5)').attr('name'),
                visitorOdds: row.find('td:nth-child(6)').text(),
                tieOdds: row.find('td:nth-child(7)').text(),
                homeOdds: row.find('td:nth-child(8)').text()
            });
    });

    return games;
}