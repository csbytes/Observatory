var moment = require('moment');
var S = require('string');

exports.msToSec = function(ms){
	return (ms/1000);
};

// An array containing all of the unit and conversion values
var convInfo = [
	{unit: "ms", conv: 1000},
	{unit: "sec", conv: 60},
	{unit: "min", conv: 60},
	{unit: "hr", conv: 24},
	{unit: "days", conv: 7}
];

// Converts a time from ms to a larger unit.  It then appends
// the unit and rounds to a maximum of two decimal places.
exports.formatMs = function(ms){
	var curVal = ms;

	for(var i=0; i < convInfo.length; i++){
		if(curVal < convInfo[i].conv){
			return Math.round(((curVal + 0.00001) * 100) / 100) + " " + convInfo[i].unit;
		}else{
			curVal = curVal / convInfo[i].conv;
		}
	}
};

// Converts an epoch date to a datetime
exports.epochToDatetime = function(epoch){
	return moment(epoch).format('MMM Do, YYYY');
};

// Converts a string to a valid id
exports.strToId = function(str){
	return str.replace(/\s/g, '_').replace(/\./g, '_');
};

// Truncates a job name
exports.truncate = function(str, len){
	if(len > 3){
		return S(str).left(len-3).s + S('.').times(3).s;
	}else{
		throw new Error('The length must be > then 3');
	}
	return S(str).truncate(len).s;
}