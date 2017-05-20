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

	popular: function(callback){
		var endpoint = this.BASE_URL + '/tags/' + name + '/media/recent?client_id=' + this.config.client_id;
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
	client_id	: '467af6bc7e75480881ba314941d37a91',
	redirectURI : 'http://127.0.0.1',
	access_token : '234543206.467af6b.a77d34824c27423eb3c8c17f51497806'
})

$(document).ready(function(){
	Instagram.tagsByName('senti',function(response){
		var $instagram = $('#instagram');
		for (var i = 0; i < response.data.length; i++) {
			imgUrl = response.data[i].images.low_resolution.url;
			$instagram.append('<img src="'+imgUrl+'"/>');
		};
	})
});