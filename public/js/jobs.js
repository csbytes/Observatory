// Wrapped in a function returning an object in order to
// prevent namespace polution and keep the details more hidden.
var Jobs = (function(){
	var failed = {};
	var successful = {};
	var pending = {};

	// Convets the object containing the jobs to an array
	function toArr(jobs){
		jobArr = [];
		for(var key in jobs){
			jobArr.push(jobs[key]);
		}

		return jobArr;
	};

	return {
		failed: {},
		successful: {},
		pending: {},
		failedArr: [],
		successfulArr: [],
		pendingArr: [],
		allToArr: function(){
			var arr = [];
			for (var key in this.all) {
    		arr.push(this.all[key]);
			}
			return arr;
		},
		setJob: function(job){
			// Removes the job from any of the maps if it exists.
			// If it has to be removed from the list the associated
			// array is regenerated.
			if(typeof this.failed[job.name] != 'undefined'){
				delete this.failed[job.name];
				this.failedArr = toArr(this.failed);
			}else if(typeof this.successful[job.name] != 'undefined'){
				delete this.successful[job.name];
				this.successfulArr = toArr(this.failed);
			}else if(typeof this.pending[job.name] != 'undefined'){
				delete this.pending[job.name];
				this.pendingArr[job.name];
			}

			// Adds the job to the appropritate this and regenerate it
			if(job.status == 'FAILURE'){
				this.failed[job.name] = job;
				this.failedArr = toArr(this.failed);
			}else if(job.status == 'SUCCESS'){
				this.successful[job.name] = job;
				this.successfulArr = toArr(this.successful);
			}else{
				this.pending[job.name] = job;
				this.pendingArr = toArr(this.pending);
			}
		},
		// Updating a group of jobs at a time can improve performance
		// as it reduces the number of times the arrays need to be updated.
		setJobs: function(jobs){

			for(var i = 0; i < jobs.length; i++){
				var curJob = jobs[i];

				// Removes the job from any of the maps if it exists.
				if(typeof this.failed[curJob.name] != 'undefined'){
					delete this.failed[curJob.name];
				}else if(typeof this.successful[curJob.name] != 'undefined' ){
					delete this.successful[curJob.name];
				}else if(typeof this.pending[curJob.name] != 'undefined'){
					delete this.pending[curJob.name];
				}

				// Adds the job to the new map
				if(curJob.status == 'FAILURE'){
					this.failed[curJob.name] = curJob;
				}else if(curJob.status == 'SUCCESS'){
					this.successful[curJob.name] = curJob;
				}else{
					this.pending[curJob.name] = curJob;
 				}
			}
			
			this.failedArr = toArr(this.failed);
			this.successfulArr = toArr(this.successful);
			this.pendingArr = toArr(this.pending);
		},
		getJob: function(jobName){
			if(typeof this.failed[job.name] != 'undefined'){
				return this.failed[job.name];
			}

			if(typeof this.successful[job.name] != 'undefined'){
				return this.successful[job.name];
			}

			if(typeof this.pending[job.name] != 'undefined'){
				return this.pending[job.name];
			}
		},
		removeJob: function(job){
			if(typeof this.failed[job.name] != 'undefined'){
				delete this.failed[job.name];
				this.failedArr = toArr(this.failed);
			}else if(typeof this.successful[job.name] != 'undefined'){
				delete this.successful[job.name];
				this.successfulArr = toArr(this.successful);
			}else if(typeof this.pending[job.name] != 'undefined'){
				delete this.pending[job.name];
				this.pendingArr = toArr(this.pending);
			}
		},
		removeJobs: function(jobs){
			for(var i = 0; i < jobs.length; i++){
				var curJob = jobs[i];
				if(typeof this.failed[curJob.name] != 'undefined'){
					delete this.failed[curJob.name];
				}else if(typeof this.successful[curJob.name] != 'undefined'){
					delete this.successful[curJob.name];
				}else if(typeof this.pending[curJob.name] != 'undefined'){
					delete this.pending[curJob.name];
				}

				this.failedArr = toArr(this.failed);
				this.successfulArr = toArr(this.successful);
				this.pendingArr = toArr(this.pending);
			}
		}
	};
})();