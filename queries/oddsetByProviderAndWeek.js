var parsers = require('../parsers');

exports.query = function (params, callback) {
    var results = {
        oddsetProvider: params.oddsetProvider || 'sportselect',
        season: params.season || '2014',
        week: params.week || 1
    };

    parsers.sportselectOddsetParser(function (games) {
        results.games = games;
        callback(results);
    });
};
