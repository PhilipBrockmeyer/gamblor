
/*
 * GET users listing.
 */

exports.list = function (req, res){
    console.log(process.env);
    res.send("respond with a resource" + process.env.TEST_ENV);
};