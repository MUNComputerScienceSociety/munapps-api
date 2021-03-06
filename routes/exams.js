"use strict";

var MUN = require("MUN");

var json = {
	1: {
		"get":
			function get(request, response) {
				return request.authentication()
				.fail(function (error) {
					response.setHeader("WWW-Authenticate", "Basic realm=\"Self Service\"");
					throw error;
				})
				.then(MUN.selfService.finalExamSchedule)
				.then(function (result) {
					var stdout = result[0];
					response.write(stdout);
				});
			}
	}
};

module.exports = {
	"path": "/exams",
	"media": { "application/json": json }
};
