'use strict';

var app = angular.module('observatory', []);

// Define the routes
app.config(function($routeProvider){
	$routeProvider
		.when('/jobs', {templateUrl: '/jobs', controller: 'JobListCtrl'})
		.otherwise({redirectTo: '/jobs'});
});

app.controller('JobListCtrl', ['$scope', 'JobService', function JobListCtrl($scope, JobService){
	// Current scroll position
	$scope.$scrollCount = 8;

	// Registers the listener montitoring for job updates
	$scope.$on('updateJobs', function(event, data){
		$scope.failed = Jobs.failedArr;
		$scope.successful = Jobs.successfulArr;
		$scope.pending = Jobs.pendingArr;
		$scope.$apply();
	});

	// The jobs being displayed
	$scope.failed = Jobs.failedArr;
	$scope.successful = Jobs.successfulArr;
	$scope.pending = Jobs.pendingArr;

	// Truncates the name if necessary
	$scope.truncateStr = function(str, len){
		if(str.length < len){
			return str;
		}else if(len > 3){
			return str.substring(0, len-3) + '...';
		}else{
			throw new Error('The length must be > 3');
		}
	};

	// Converts a time from ms to a larger unit.  It then appends
	// the unit and rounds to a maximum of two decimal places.
	$scope.formatMs = function(ms){
		// An array containing all of the unit and conversion values
		var convInfo = [
			{unit: "ms", conv: 1000},
			{unit: "sec", conv: 60},
			{unit: "min", conv: 60},
			{unit: "hr", conv: 24},
			{unit: "days", conv: 7}
		];
		var curVal = ms;

		for(var i=0; i < convInfo.length; i++){
			if(curVal < convInfo[i].conv){
				return Math.round(((curVal + 0.00001) * 100) / 100) + " " + convInfo[i].unit;
			}else{
				curVal = curVal / convInfo[i].conv;
			}
		}
	};

}]);

app.controller("StatusCtrl", ['$scope', 'JobService', function($scope, JobService){
	// The three statuses
	var connected = "status-success glyphicon-globe";
	var issue = "glyphicon-warning-sign";
	var disconnected = "status-failure glyphicon-remove-circle";

	// Registers the listener montitoring for job updates
	$scope.$on('statusUpdate', function(event, data){
		if(data.level == 'error'){
			$scope.connectionStatus = disconnected;
		}else if(data.level == 'success'){
			$scope.connectionStatus = connected;
		}else{
			$scope.connectionStatus = issue;
		}

		$scope.connectionStatusMessage = data.message;
		$scope.$apply();
	});
}]);

app.factory('JobService', ['$q', '$rootScope', function($q, $rootScope) {
    // We return this object to anything injecting our service
    var Service = {};
    // Keep all pending requests here until they get responses
    var callbacks = {};

    // Create our websocket object with the address to the websocket
    var primus = new Primus(ClientConfig.server);
    
    primus.on('reconnect', function reconnect(opts) {
    	var data = {
    		"level": "error",
    		"message": "Reconnecting"
    	}
    	$rootScope.$broadcast('statusUpdate', data);
  	});

	  primus.on('offline', function online() {
	    var data = {
    		"level": "error",
    		"message": "Offline"
    	}
    	$rootScope.$broadcast('statusUpdate', data);
	  });

	  primus.on('open', function open() {
	    var data = {
	    	"level": "success",
	    	"message": "Connected"
	    }
	    $rootScope.$broadcast('statusUpdate', data);
	  });

	  primus.on('error', function error(err) {
	    var data = {
	    	"level": "error",
	    	"message": "Unknown error"
	    }
	    $rootScope.$broadcast('statusUpdate', data);
	  });

	  primus.on('data', function incoming(data) {
	    listener(data);
	  });

	  primus.on('end', function end() {
	    var data = {
	    	"level": "error",
	    	"message": "Lost connection"
	    }
	    $rootScope.$broadcast('statusUpdate', data);
	  });

	  primus.on('close', function end() {
	    var data = {
	    	"level": "error",
	    	"message": "Lost connection"
	    }
	    $rootScope.$broadcast('statusUpdate', data);
	  });

    function listener(actions) {
      console.log("Received data from websocket: ", actions);
      var updateJobArr = [];
      var removeJobArr = [];

      for(var i = 0; i < actions.length; i++){
      	var curAction = actions[i];
      	if(curAction.action == 'remove'){
      		console.log("Removing ", curAction.job);
      		Jobs.removeJob(curAction.job.name);
	      }else if(curAction.action == 'update'){
	      	console.log("Updating ", curAction.job);
	      	Jobs.setJob(curAction.job);
	      }else{
	      	console.error("Undefined action: " + curAction.action);
	      }
      }

      // Sets and removes the jobs
      Jobs.setJobs(updateJobArr);
      Jobs.removeJobs(removeJobArr);

      // Emits an updateJobs action
      $rootScope.$broadcast('updateJobs', actions);
    }

    return Service;
}]);