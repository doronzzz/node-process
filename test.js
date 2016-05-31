var process = require('./index.js');
var test = require('tape');


test('Convert URL string to JS object', function (t) {
	var processEvents = process.process();
    t.plan(2);
   
    processEvents.on('start',function(){
    	t.pass('START reading file')
    },'START reading file worked');

    processEvents.on('end',function(){
    	t.pass('END reading file')
    },'END reading file worked');
});