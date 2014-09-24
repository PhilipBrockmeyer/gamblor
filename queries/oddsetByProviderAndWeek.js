﻿var request = require('request');
var jsdom = require('jsdom');

exports.query = function (params, callback) {
    request.get('http://sportselect.wclc.com/Proline-Gamelist-html.htm', function(error, response, body) {
        jsdom.env(body, [], function(err, window) {
            var results = {
                oddsetProvider: params.oddsetProvider || 'sportselect',
                season: params.season || '2014',
                week: params.week || 1,
                games: parseGamesFromSportSelect(window)
            };

            callback(results);
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