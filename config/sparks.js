exports.createRoutes = function(primus){
	
	primus.on('connection', function (spark) {
  		// spark is the new connection.
	});

	primus.on('disconnection', function (spark) {
  		// the spark that disconnected
	});
};