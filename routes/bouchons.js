var express 	= require('express');
var router 		= express.Router();
var date 	  	= require('../utils/date');
var validator 	= require("email-validator"); 


exports.load =  function(req, res) { 
    res.render('bouchons');
}


exports.post =  function(req, res) { 
 
	// Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var adherents = req.body.adh; 
    var seuil = req.body.seuil; 
    var email = req.body.email; 
     
	var collection = db.get('concour_pass');

    if(validator.validate(email)) {
 
	    collection.findOne({email : email}, function(err, user) { 
	    	if (!user) {  

	    		// We add it
	    		collection.insert({
					"email" 	: email,
                    "seuil"     : seuil,
                    "adherents" : adherents,
                    "reg_date"  : date.getDate()
	    		}, function (err, doc) { 

					if (err) {
						res.render('bouchons',{'error':'Erreur de connection avec la base de données. Adressez-vous au stand du POLCA.'});
					}
					else {
						res.render('bouchons',{'success':'Merci votre participation !'});
					}
	    		});
	    	} 
	    	else { 
	    		res.render('bouchons',{'error':'Vous avez déjà participé (le ' + user.reg_date + ') !'});
	    	}
	  	});
    } else {
		res.render('bouchons',{'error':'Entrez une adresse email valide.'});
    } 
}