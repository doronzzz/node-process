"use strict";

var exports = module.exports = {};
var privateFns = {};

const events = require('events');
const parser = require('../TikalNodeJs/index.js');
const fs = require('fs');

const fileArg = function(){
	var file = "data.txt";	//default file name
	
	try{
		file = process.argv[2].split('=')[1];
	}catch(e){}
	
	return file;
}();


var eventEmitter = new events.EventEmitter();

exports.watch = function(){
	fs.watch( fileArg, function ( curr, prev ) {
   		exports.process();
	});
}

exports.process = function(fileName){
	var readableStream = fs.createReadStream(fileArg,{encoding:"utf-8"});
	var data = '';

	eventEmitter.emit('start');

	readableStream.on('data', function(chunk) {
	    data+=chunk;
	});

	readableStream.on('error', function(err) {
	    eventEmitter.emit('error',err);
	});

	readableStream.on('end', function(){
	    var linesArray = data.match(/[^\s]+/g);
		
		for (var item in linesArray){
			var prsd = parser.parse(linesArray[item]);
			if(prsd !== null && prsd.hostname !== null){
				eventEmitter.emit('data',prsd);
				console.log(prsd);
			}else{
				eventEmitter.emit('data-error',prsd);
			}
		}
	    eventEmitter.emit('end',data);
	});

	return eventEmitter;
}