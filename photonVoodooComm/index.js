var Particle = require('particle-io');

var objectDebug = function(obj) {
  return JSON.stringify(obj);
};

/* var board = new Particle({
  token: process.env.PARTICLE_TOKEN,
  deviceId: process.env.PARTICLE_DEVICE_ID
});*/

/* var board = new Particle({
  host: '192.168.1.117',
  port: 48879
});*/

var board = new Particle({
  host: '10.84.18.7',
  port: 48879,
});

console.log("Board mode: " + objectDebug(board.MODES));

function exec_context() {
  console.log(
    "Connected to " + board.deviceName + 
    " (" + board.deviceId + ") " +
    "at " + board.deviceIp + ":"  + board.devicePort
  );

  this.pinMode("D7", this.MODES.OUTPUT); // this.pinMode("D7", 1);
  this.digitalWrite("D7", 1);
}

board.on('ready', exec_context);
board.on('error', function(err) {
  console.log("ERROR!" + err);
});
