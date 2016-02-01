var Particle = require('particle-io');
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/*
var board = new Particle({
  token: process.env.PARTICLE_TOKEN,
  deviceId: process.env.PARTICLE_DEVICE_ID
});*/

var board = new Particle({
  host: '192.168.1.117',
  port: 48879
});


board.on('ready', exec_context);

// console.log("ReadLINE: ", readline);

function exec_context() {
  // Using pin to simulate
  this.pinMode('D7', this.MODES.OUTPUT);

  rl.setPrompt('SERVO Simulation ');
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
  });
}
