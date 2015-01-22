(function(module) {
	"use strict";
	var Color = {},
	html = '<font style="color:$1">$2</font>';

	Color.parse = function(data, callback) {
		var code = /(?:<pre>.*?<\/pre>|<code>.*?<\/code>)/g;
		var reg = /%\((#(?:[A-Fa-f0-9]{3}(?:[A-Fa-f0-9]{3})?)|(?:rgb\(\d{1,3},\d{1,3},\d{1,3}\))|(?:[a-z]){3,})\)\[(.+?)\]/g;

		if (data && typeof data === 'string') {
			//preview
			data = parser(data, code, reg);
		} else if (data.postData && data.postData.content && data.postData.content.match(reg)) {
			//post
			data.postData.content =  parser(data.postData.content, code, reg);
		} else if (data.userData && data.userData.signature && data.userData.signature.match(reg) ) {
			//signature
			data.userData.signature =  data.userData.signature.replace(reg, html);
		}
		
		callback(null, data);
	};

	function parser(data, code, reg) {
		//create a variable to capture code content
		var codesTag = [];
		//replace all codes tags by a var we can use in a regex later
		data = data.replace(code, function(match){
			codesTag.push(match);
			return '__CODE__';
		});
		//do the replace on the whole
		data = data.replace(reg, html);
		//replace CODE with previously stocked code content
		data = data.replace(/__CODE__/, function(){
			return codesTag.shift();
		});
		return data;
	}

	module.exports = Color;
}(module));