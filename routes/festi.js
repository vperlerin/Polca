var express 	= require('express');
var router 		= express.Router();
var date 	  	= require('../utils/date');
var validator 	= require("email-validator"); 


exports.load =  function(req, res) { 
    // Generate Random number for question 
    var rand = Math.floor(Math.random() * 200);

    res.render('festi',{rand: rand % 2 == 0});
}


exports.post =  function(req, res) { 
 
	// Set our internal DB variable
    var db = req.db;

    var email = req.body.email; 
    email = email.toLowerCase();
     
	var collection = db.get('concour_pass');

    if(validator.validate(email)) {
 
	    collection.findOne({email : email}, function(err, user) { 
	    	if (!user) {  
            
                // Build info to collect
                var info = {
					"email" 	: email,
                    "reg_date"  : date.getDate()
	    		};
                
                if(typeof req.body.seuil !== 'undefined') {
                    info.seuil = req.body.seuil;
                } else if(typeof req.body.adh !== 'undefined') {
                    info.adherents = req.body.adh;
                }
                
                // We add it
	    		collection.insert(info, function (err, doc) { 

					if (err) {
						res.render('festi',{'error':'Erreur de connection avec la base de données. Adressez-vous au stand du POLCA.'});
					}
					else {
						res.render('festi',{'success':'Merci votre participation !'});
					}
	    		});
	    	} 
	    	else { 
	    		res.render('festi',{'error':'Vous avez déjà participé (le ' + user.reg_date + ') !'});
	    	}
	  	});
    } else {
		res.render('festi',{'error':'Entrez une adresse email valide.'});
    } 
}