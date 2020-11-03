var nodes7 = require('nodes7');  // This is the package name, if the repository is cloned you may need to require 'nodeS7' with uppercase S
const { nextTick } = require('process');
var conn = new nodes7;
var doneReading
var doneWriting

var variables = {
		  TEST2: 'M32.2', 		// Bit at M32.2
		  TEST3: 'M100.0', 		// Bit at M20.0
      TEST7: 'DB1,INT12.2',		// Two integer value array

};

const startConnection = function(){

doneReading, doneWriting = false;

conn.initiateConnection({port: 102, host: '192.168.1.5', rack: 0, slot: 1}, connected); // slot 2 for 300/400, slot 1 for 1200/1500
//conn.initiateConnection({port: 102, host: '192.168.0.2', localTSAP: 0x0100, remoteTSAP: 0x0200, timeout: 8000}, connected); // local and remote TSAP can also be directly specified instead.  The timeout option specifies the TCP timeout.

function connected(err) {
	if (typeof(err) !== "undefined") {
		// We have an error.  Maybe the PLC is not reachable.
		console.log(err);
	}
	conn.setTranslationCB(function(tag) {return variables[tag];}); 	// This sets the "translation" to allow us to work with object names
  conn.writeItems(['TEST3'], [true], valuesWritten)
	conn.writeItems('TEST7', [ 666, 777 ], valuesWritten);  // You can write a single array item too.
}

function valuesWritten(anythingBad) {
	if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
	console.log("Done writing.");
  doneWriting = true;
  conn.dropConnection(()=>{return true})
}
return true
}

module.exports = startConnection
