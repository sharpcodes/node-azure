
var express = require('express');
var router = express.Router();
var https=require('https');

/* GET home page. */

router.get('/', function(req, res) {

  console.log("calling datapower");
  var options={
    hostname:'extb2b.lowes.com',
    port:901,
    path:'AzureWebGetRequest',
    rejectUnauthorized: false,
    method:'GET',
    headers:{"Authorization":"Basic RHluYW1pY3NDUk06RU42MFZGbjVuNlpmQWpNWA=="}
  };

  var req2=https.request(options, function(response) {
    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      // Response received
      var parsedResponse =body;
      console.log("response -->"+parsedResponse);
      res.render('index', { title: 'Express',response:parsedResponse });
    });
  });

  req2.on('error', function(e) {
    console.error(e);
  });
  req2.end();



});

module.exports = router;
