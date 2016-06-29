var express = require('express');
var router = express.Router();
var azure = require('azure');

/* GET users listing. */
router.get('/', function(req, res, next) {

  console.log("request received");
  var serviceBusService = azure.createServiceBusService('Endpoint=sb://lowes-scs.servicebus.windows.net/;SharedAccessKeyName=lowes-scs;SharedAccessKey=FSKiTpdgm3jmnaHcNPVMoj9iJd4QCca6RuX+LFHTJgc=');

  serviceBusService.receiveQueueMessage('scs.stores.inbound', function(error, receivedMessage){
    if(!error){
      console.log("message drained "+receivedMessage);
      res.render('index', { message: JSON.stringify(receivedMessage.body) });
    }else{
      console.log(error);
    }
  });

});

module.exports = router;
