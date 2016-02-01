// Memory leak
var Particle = require('particle-io');
// var readline = require('readline');
var server = require('http').createServer();
var io = require('socket.io')(server);

var HIGH = 1;
var LOW = 0;
var D6Status = LOW;
var D7Status = LOW;
/*******************************************************************************
 * Function Name  : debounce
 * Description    : Software key debounce
 * Input          : Pin
 * Output         : None.
 * Return         : Value of the pin (0 or 1) in INT type
 * Returns a negative number on faliure
 ********************************************************************************/
var debounce = function(pin, readState) {
  var pinState = -1;
  var newStatus = LOW;
  function execAfterRead(state) {
    newStatus = state;
    if (newStatus === HIGH) {
      readState(false);
      return;
    }
    var self = this;
    setTimeout(function() {
      self.digitalRead(pin, function(state) {
        newStatus = state;
        readState(newStatus === HIGH);
      });
    }, 100);
  }
  this.digitalRead(pin, execAfterRead);
};

// Error state -1;
var negState = function(state) {
  if (state === HIGH) {
    return LOW;
  } else if (state === LOW) {
    return HIGH;
  }
  return -1;
};

var listeningKey = function(pin) {
  var self = this;
  var readState = function(pinState) {
    pinStatus = negState(pinState);
    self.digitalWrite('D7', pinStatus);
  };
  debounce.call(this, pin, readState);
};

/*
 * Socket IO
 */
io.on('connection', function(socket) {
//  socket.on()
});

var board = new Particle({
  host: '192.168.1.117',
  port: 48879
});

board.on('ready', exec_context);

board.on('close', function() {
  process.exit(0);
  this.stop();
});

function exec_context() {
  // Using pin to simulate
  this.pinMode('D7', this.MODES.OUTPUT);
  this.pinMode('D6', this.MODES.INPUT);

  console.log("exec_context!!");
  var byte = 0;
  var self = this;
  var foreverLoop = function() {
    listeningKey.call(self, 'D6');
    foreverLoop();
  };

  foreverLoop();
  /* setTimeout(function() {
  
  }.bind(this), 500); */
  
}
