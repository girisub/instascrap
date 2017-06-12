window.Instagram = {
	/**
	*store application settings
	*/
	config: {},

	BASE_URL: 'https://api.instagram.com/v1',

	init: function(opt){
		//opt = opt||{};
		this.config.client_id = opt.client_id;
		this.config.redirectURI = opt.redirectURI;
		this.config.access_token = opt.access_token;
	},

	getToken: function(callback){
		var endpoint = 'https://api.instagram.com/oauth/authorize/?client_id='+this.config.client_id+'&redirect_uri='+
		this.config.redirectURI+'&response_type=token';
		this.getPOST(endpoint,callback);
	},

	liked: function(callback){
		//https://api.instagram.com/v1/users/self/media/liked?access_token=ACCESS-TOKEN

		var endpoint = this.BASE_URL + '/users/self/media/liked?access_token=' + this.config.access_token;
		this.getJSON(endpoint,callback);
	},
	/*
	*this function takes in a tagname and gets the response with all the images with that tagname
	*right now works for the user and not for all the photos on insta
	*/
	tagsByName: function(name, callback ){
		var endpoint = this.BASE_URL + '/tags/' + name + '/media/recent?access_token='+ this.config.access_token;
		this.getJSON(endpoint,callback);
	},

	getJSON: function(url,callback){
		$.ajax({
			type:'GET',
			url: url,
			dataType: 'jsonp',
			success: function(response){
				if(typeof callback === 'function') callback(response);
			}
		});
	},

	getPOST: function(url,callback){
		$.ajax({
			type:'POST',
			url: url,
			dataType: 'jsonp',
			success: function(response){
				if(typeof callback === 'function') callback(response);
			}
		});
	}
};



Instagram.init({
	client_id	: '',
	redirectURI : 'http://127.0.0.1',
	access_token : ''
})

/*
this outputs results for a given tag
*/

// $(document).ready(function(){
// 	Instagram.popular('senti',function(response){
// 		var $instagram = $('#instagram');
// 		for (var i = 0; i < response.data.length; i++) {
// 			imgUrl = response.data[i].images.low_resolution.url;
// 			$instagram.append('<img src="'+imgUrl+'"/>');
// 		};
// 	})
// });

/*
this is to output the recently liked images by the user of the access token
*/

$(document).ready(function(){
	Instagram.liked(function(response){
		var $instagram = $('#instagram');
		for (var i = 0; i < response.data.length; i++) {
			imgUrl = response.data[i].images.low_resolution.url;
			$instagram.append('<img src="'+imgUrl+'"/>');
		};
	})
});
