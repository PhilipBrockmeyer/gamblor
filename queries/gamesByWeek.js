var parsers = require('../parsers');

exports.query = function (params, callback) {
    var results = {
        season: params.season || '2014',
        week: params.week || 1
    };
    
    parsers.nflGamesParser(results.season, results.week, function (games) {
        results.games = games;
        callback(results);
    });
};
