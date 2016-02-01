var Particle = require('particle-io');
// var readline = require('readline');
var server = require('http').createServer();
var io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.on()
});


var HIGH = 1;
var LOW = 0;
var D6Status;
var D7Status;
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
  var newStatus = digitalRead(pin);
  if (newStatus === HIGH) {
    readState(false);
  }
  var self = this;
  setTimeout(function() {
    newStatus = self.digitalRead(pin);
    readState(newStatus === HIGH);
  }, 100);
};

var board = new Particle({
  host: '192.168.1.117',
  port: 48879
});

var listeningKey = function(pin) {
  var readState = function(pinState) {
  };
};

board.on('ready', exec_context);

function exec_context() {
  // Using pin to simulate
  this.pinMode('D7', this.MODES.OUTPUT);

/*  rl.setPrompt('SERVO Simulation ');
  rl.prompt();

  var self = this;

  rl.on('line', function(line) {
    var pos = line.trim();
    console.log("POS: ", pos);
    if (pos === '1') {
      self.digitalWrite("D7", 1);
    } else {
      self.digitalWrite("D7", 0);
    }
    rl.prompt();
  }).on('close', function() {
    self.digitalWrite("D7", 0);
    process.exit(0);
  });*/
}
