var config = {};

//======================
// Jenkins configuration
//======================
config.jenkins = {};

// The list of jobs to monitor.  The list can be taken from a view or from
// a list of jobs.  If a view is specified then any jobs will be ignored.
config.jenkins.view = 'Jobs';
//config.jenkins.view = 'tax.view.all';

// The jenkins hostname
config.jenkins.hostname = 'jenkins-ersmi.rhcloud.com';

// The port jenkins is listening on
config.jenkins.port = '443';

// Should https be used
config.jenkins.https = true;

//==================
// Web configuration
//==================
config.web = {};

// Sets the port that node should listen on
config.web.port = process.env.WEB_PORT || 3000;

//===================
// Cron configuration
//===================
config.cron = {};

// Sets the frequency of the cron jobs.  This matches linux
// cron formatting but has seconds at the beginning
config.cron.frequency = "*/2 * * * * *";

//========
// Cleanup
//========

// Exports the config object so it is available externally
module.exports = config;