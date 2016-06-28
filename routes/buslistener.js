var express = require('express');
var router = express.Router();
var azure = require('azure');

/* GET users listing. */
router.get('/', function(req, res, next) {

  var serviceBusService = azure.createServiceBusService('Endpoint=sb://scsqueue1-ns.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=vxH6aZlqXSHjVCyXzOJ9iLj7fKBmwOJZnRW7bymT0oE=');

  serviceBusService.receiveQueueMessage('SCSQUEUE1', function(error, receivedMessage){
    if(!error){
      console.log("message drained "+receivedMessage);
      res.render('index', { message: JSON.stringify(receivedMessage.body) });
    }
  });

});

module.exports = router;
