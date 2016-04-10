// // Default softAP mode is TCP without browser
// var SoftAPSetup = require('softap-setup');
// var sap = new SoftAPSetup({
//   host: '192.168.1.110'
// });

// sap.deviceInfo(callback);
// function callback(err, dat) {
//   if (err) { throw err; }
//   console.log("Device ID: %s, claimed: %s", dat.id, dat.claimed ? "yes" : "no");
// }


var SoftAPSetup = require('./index');
var sap = new SoftAPSetup();

console.log(JSON.stringify(require('softap-setup')));
console.log(JSON.stringify(require('http')));

sap.deviceInfo(callback);
function callback(err, dat) {
    if (err) { throw err; }
    console.log("Device ID: %s, claimed: %s", dat.id, dat.claimed ? "yes" : "no");
};
