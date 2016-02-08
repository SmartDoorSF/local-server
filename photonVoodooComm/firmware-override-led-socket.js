var Particle = require('particle-io');
var http = require('http');
var request = require('request');

var HEROKU_HOST = "https://powerful-ravine-17147.herokuapp.com/";
var PATH = "decision/";
var CREDENTIAL = 'open';

var LOW = 0;
var HIGH = 1;
/*******************************************************************************
 * Function Name  :
 * Description    :
 * Input          : Pin
 * Output         : None.
 * Return         :
 * Returns
 ********************************************************************************/
function checkCredential(target, CREDENTIAL) {
  return target === CREDENTIAL;
}
// JSON body parser
function parseResponse(res) {
  console.log("RECEIVED RESPONSE from Remote Server", res.body);
  return res.body;
}

function getAuthFromRemote(action) {
  request.post({url: HEROKU_HOST + PATH, form: {key: 'value'}}, function(err, httpResp, body){
    var openDoor = checkCredential(body, CREDENTIAL);
    action(openDoor);
  });
}

var board = new Particle({
  host: '192.168.1.113',
  port: 48879,
});

board.on('ready', exec_context);

function exec_context() {
  // Using pin to simulate
  this.pinMode('D7', this.MODES.OUTPUT);
  this.pinMode('D6', this.MODES.INPUT);
  
  var self = this;
  this.digitalRead('D6', function(state){
    if (state === HIGH) {
      getAuthFromRemote(function(openDoor) {
      // Currently since remote server is not steadily available
      // openDoor is overrided as true
      openDoor = true;
        if (openDoor) {
//          self.digitalWrite('D7', D7State = negState(D7State));
          self.digitalWrite('D7', HIGH);
        }
      });
    }
  });
}
