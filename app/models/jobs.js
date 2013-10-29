var moment = require('moment');
var S = require('string');

var jobs = {};
exports.jobQueue = [];

exports.createJob = function(jobName, jobObj){
	var curStatus = jobObj.result;

	if(jobObj.building){
		curStatus = 'PENDING';
	}

	// The new job
	var newJob = {
		'name': jobName,
		'url': jobObj.url,
		'buildNumber': jobObj.number,
		'date': moment(jobObj.timestamp).format('MMM Do, YYYY'),
		'time': moment(jobObj.timestamp).format('h:mm:ss a'),
		'status': curStatus,
		'duration': jobObj.duration,
		'truncateName': function(len){
			if(this.name.length < len){
				return str;
			}else if(len > 3){
				return this.name.substring(0, len-3) + '...';
			}else{
				throw new Error('The length must be > 3');
			}
		}
	};

	return newJob;
};

exports.setJob = function(jobName, newJob){
	jobs[jobName] = newJob;
	exports.jobQueue.push({
		action: 'update',
		job: newJob
	});
};

exports.getJob = function(jobName){
	return jobs[jobName];
};

exports.removeJob = function(jobName){
	var jobToDelete = getJob(jobName);
	delete jobs[jobName];
	jobQueue.push({
		action: 'remove',
		job: jobToDelete
	});
};

exports.isEqual = function(job1, job2){
	if(typeof job1 == 'undefined' && typeof job2 == 'unefined'){
		return false;
	}

	if(typeof job1 == null || typeof job2 == null){
		return false;
	}

	// Check to see if all properties in job1 are euqal to those same
	// properties in job2.
	for(var key in job1){
		if(typeof job1[key] != 'function' && job1[key] != job2[key]){
			return false;
		}
	}

	// If everything at this point hasn't returned then they are equal
	// for this purpose.
	return true;


};

exports.all = jobs;
