(function(module) {
	"use strict";
	var Color = {},
	html = '<font style="color:$1">$2</font>';

	Color.parse = function(postContent, callback) {
		var match = /%\((#(?:[A-Fa-f0-9]{3}(?:[A-Fa-f0-9]{3})?)|(?:rgb\(\d{1,3},\d{1,3},\d{1,3}\))|(?:[a-z]){3,})\)\[(.+?)\]/g;

		postContent = postContent.replace(match, html);

		callback(null, postContent);
	};

	module.exports = Color;
}(module));