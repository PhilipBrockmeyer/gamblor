
/*
 * GET users listing.
 */

exports.list = function (req, res){
    res.setHeader('Content-Type', 'application/json');
    
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function (e, docs) {
        res.end(JSON.stringify(docs));
    });
};