exports.createRoutes = function(app, models){
	
	app.get('/', function(req, res){
		res.render('layout');
	});

	app.get('/jobs', function(req, res){
		res.render('home', {jobs: models.Jobs.all});
	});
};