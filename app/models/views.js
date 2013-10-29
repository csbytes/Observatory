var views = {};

exports.createView = function(viewName, viewObj){
	var jobs = [];

	for(var i = 0; i < viewObj.jobs.length; i++){
		jobs.push({
			'name': viewObj.jobs[i].name,
			'url': viewObj.jobs[i].url
		});
	}

	// The new view
	var newView = {
		'name': viewObj.name,
		'description': viewObj.description,
		'url': viewObj.url,
		'jobs': jobs,
		'basicJobsArr': function(){
			var jobsArr = [];

			for(var i = 0; i < this.jobs.length; i++){
				jobsArr.push(this.jobs[i].name);
			}

			return jobsArr;
		}
	}

	return newView;
};

exports.setView = function(viewName, newView){
	views[viewName] = newView;
};

exports.getView = function(viewName){
	return views[viewName];
};

exports.removeView = function(viewName){
	delete views[viewName];
};

exports.all = views;