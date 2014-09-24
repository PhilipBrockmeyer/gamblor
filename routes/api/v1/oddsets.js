var request = require('request');
var jsdom = require('jsdom');
var constants = require('../../../resources/constants');
/*
 * GET odd sets.
 */
exports.index = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    request.get('http://sportselect.wclc.com/Proline-Gamelist-html.htm', function (error, response, body) {
        jsdom.env(body, [], function (err, window) {
            var results = {
                provider: constants.oddsProviders.sportSelect,
                season: '2014',
                week: 4,
                games: parseGamesFromSportSelect(window)
            };
            
            res.end(JSON.stringify(results));
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
                visitor: row.find('td:nth-child(5)').attr('name'),
                home: row.find('td:nth-child(6)').attr('name'),
                visitorOdds: row.find('td:nth-child(8)').text(),
                tieOdds: row.find('td:nth-child(10)').text(),
                homeOdds: row.find('td:nth-child(12)').text()
            });
    });

    return games;
}