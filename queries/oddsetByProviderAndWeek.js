var parsers = require('../parsers');
var gamesByWeek = require('./gamesByWeek').query;


exports.query = function (params, callback) {
    var results = {
        oddsetProvider: params.oddsetProvider || 'sportselect',
        season: params.season || '2014',
        week: params.week || 1
    };
    
    gamesByWeek({
        season: results.season,
        week: results.week
    }, function (games) {
        parsers.sportselectOddsetParser(function (odds) {
            results.games = odds;
            callback(results);
        });
    });
};
