var http = require('http');
var https = require('https');
var winston = require('winston');

exports.Jenkins = function(options){
	var jenkinsObj = {};

	var fetchUrl = function(path, callback){
	// Sets the options
	var opts = jenkinsObj.options;
	opts.path = path,
	opts.agent = false;
	opts.rejectUnauthorized = false;
	
	winston.debug("Fetching path: %s", opts.path);

	// Makes the request to the server
	var req = client.request(opts, function(res){
		var json = '';

		// Handles any error on the response
		res.on('error', function(error){
			callback(null, error);
		});

		// Combines all of the responses together
		res.on('data', function(chunk, error){
			json += chunk;
		});

		// Handles when the request ends
		res.on('end', function(){
			try {
				// Parses the JSON
				var parsedJson = JSON.parse(json);
				// Calls the callback with the parsed json
				callback(parsedJson, null);
			}catch(e){
				winston.error(e);
			}
		});
	});

	// Finalizes the request
	req.end();

	// Handles any errors on the request
	req.on('error', function(error){
		callback(null, error);
	});	
};
	
	jenkinsObj.options = {};
	
	jenkinsObj.options.hostname = options.hostname || 'localhost';
	jenkinsObj.options.port = options.port || 80;

	// Sets the client to the default of http
	var client = http;

	// If https was specified, switches to https instead
	if(options.https){
		client = https;
	}
	
	// Gets the latest build information for the jenkins job with the given name
	jenkinsObj.getLatestBuildInfo = function(jobName, callback){
		fetchUrl("/job/" + jobName + "/lastBuild/api/json", callback);
	};

	jenkinsObj.getJobListFromView = function(viewName, callback){
		fetchUrl("/view/" + viewName + "/api/json", callback);
	};
	
	return jenkinsObj;
};
