/*
 * GET odd sets.
 */
exports.index = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    req.queries.oddsetByProviderAndWeek({
        oddsetProvider: req.constants.oddsProviders.sportSelect,
        season: '2014',
        week: 4
    }, function (results) {
        res.end(JSON.stringify(results));
    });
};