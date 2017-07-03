var express 	= require('express');
var router 		= express.Router();
var date 	  	= require('../utils/date');
var validator 	= require("email-validator"); 


exports.load =  function(req, res) { 
	res.render('newsletter');
}

exports.post =  function(req, res) { 
	// Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userEmail = req.body.newsletter_email; 
	var collection = db.get('newsletter');

    if(validator.validate(userEmail)) {
 
	    collection.findOne({email : userEmail}, function(err, user) { 
	    	if (!user) {  

	    		// We add it
	    		collection.insert({
					"email" 	: userEmail,
					"reg_date"  : date.getDate()
	    		}, function (err, doc) { 

					if (err) {
						res.render('newsletter',{'error':'Erreur de connection avec la base de données. Adressez-vous au stand du POLCA.'});
					}
					else {
						res.render('newsletter',{'success':'Merci ! Vous recevrez notre newsletter à partir du mois prochain.'});
					}
	    		});
	    	} 
	    	else { 
	    		res.render('newsletter',{'error':'Nous avons déjà votre email dans notre liste depuis le ' + user.reg_date + ' !'});
	    	}
	  	});
    } else {
		res.render('newsletter',{'error':'Entrez une adresse email valide.'});
    }
}