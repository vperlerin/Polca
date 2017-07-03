
var monk    = require('monk');
var db      = monk('localhost:27017/polca');

/* GET Userlist page. */
router.get('/newsletter', function(req, res) {
    var db = req.db;
    var collection = db.get('newsletter');
    collection.find({},{},function(e,docs){
        console.log(docs);
    
        res.render('userlist', {
            "userlist" : docs
        });
       
    });
});