
var express = require('express');
var router = express.Router();
var https=require('https');

/* GET home page. */

router.get('/', function(req, res) {

  console.log("calling datapower");
  var payLoad={name:'sai'};
  var options={
    host:'b2bservices-azure-dev.lowes.com',
    port:901,
    path:'/AzureWebGetRequest',
    rejectUnauthorized: false,
    method:'POST',
    headers:{
      "Authorization":"Basic RHluYW1pY3NDUk06RU42MFZGbjVuNlpmQWpNWA==",
      "Content-Type":"application/json",
      "Content-Length": Buffer.byteLength(JSON.stringify(payLoad))
    }
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
      res.render('index', { title: 'modified',response:parsedResponse });
    });
  });
  console.log(JSON.stringify(payLoad));
  req2.write(JSON.stringify(payLoad));
  req2.on('error', function(e) {
    console.error(e);
  });
  req2.end();
});

module.exports = router;
