(function(module) {
	"use strict";
	var Color = {},
	html = '<span style="color: $1">$2</span>';

	Color.parse = function(postContent, callback) {
		var match = /\%\(([^\)]+)\)\[(.+)\]/g;

		postContent = postContent.replace(match, html);

		callback(null, postContent);
	};

	module.exports = Color;
}(module));