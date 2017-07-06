var express  = require('express');
var json2csv = require('express-json2csv');
 
// NEWSLETTER COLUMNS
var news_letter_columns = [{
  prop: 'email',
  label: 'EMAIL',
}, {
  prop: 'reg_date',
  label: 'DATE'
}]


// CONCOUR PASS
var concour_pass_columns = [
{
  prop: 'email',
  label: 'EMAIL',
}, 
{
  prop: 'seuil',
  label: 'SEUIL DOULEUR HUMAINE',
  render: function(data, row) {
    if(typeof data == "undefined") {
        return '-';
    } else {
        return data + ' dB';
    }
  }
}, 
{
  prop: 'adherents',
  label: 'NBRE ADHERENTS',
  render: function(data, row) {
    if(typeof data == "undefined") {
        return '-';
    } else {
        return data;
    }
  }
}, {
  prop: 'reg_date',
  label: 'DATE'
}
];



// CONCOUR PASS
var concour_bouchon_columns = [
{
  prop: 'email',
  label: 'EMAIL',
}, 
{
  prop: 'seuil_douleur',
  label: 'SEUIL DOULEUR HUMAINE',
  render: function(data, row) {
    if(typeof data === "undefined") {
        return '-';
    } else {
        return data + ' dB';
    }
  }
}, 
{
  prop: 'seuil_danger',
  label: 'SEUIL DANGER',
  render: function(data, row) {
    if(typeof data === "undefined") {
        return '-';
    } else {
        return data + ' dB';
    }
  }
}, 
{
  prop: 'duree_balladeur',
  label: 'DUREE BALLADEUR',
  render: function(data, row) {
    if(typeof data === "undefined") {
        return '-';
    } else {
        return data + ' h';
    }
  }
}, 
{
  prop: 'duree_medecin',
  label: 'CONSULTATION MEDECIN',
  render: function(data, row) {
    if(typeof data === "undefined") {
        return '-';
    } else {
        return data + ' h';
    }
  }
}, 
{
  prop: 'dose',
  label: 'DOSE QUOTIDIENNE',
  render: function(data, row) {
    if(typeof data === "undefined") {
        return '-';
    } else {
        return data;
    }
  }
}, 
{
  prop: 'subi',
  label: 'SUBI',
  render: function(data, row) {
    if(typeof data === "undefined") {
        return '-';
    } else if( data==="1") {
        return "OUI";
    } else if( data==="2") {
        return "NON";
    }
  }
}, {
  prop: 'reg_date',
  label: 'DATE'
}
]
 

// Load
exports.load = function(req, res) { 
   res.render('export');
}
 
// Export Newsletter 
exports.newsletter = function(req, res) { 
  // Set our internal DB variable
  var db = req.db; 
  var collection = db.get('newsletter');
  collection.find({}, function(err, newsletter) { 
    res.csv('newsletter', newsletter, news_letter_columns);
  });
}


// Export Festival 
exports.concour_pass = function(req, res) { 
  // Set our internal DB variable
  var db = req.db; 
  var collection = db.get('concour_pass');
  collection.find({}, function(err, col) { 
    res.csv('concour festival', col, concour_pass_columns);
  });
} 



// Export Bouchon 
exports.concour_bouchon = function(req, res) { 
  // Set our internal DB variable
  var db = req.db; 
  var collection = db.get('concour_bouchon');
  collection.find({}, function(err, col) { 
    res.csv('concour bouchons', col, concour_bouchon_columns);
  });
} 