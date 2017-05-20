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


//https://instagram.com/oauth/authorize/?client_id=467af6bc7e75480881ba314941d37a91&redirect_uri=http://127.0.0.1&response_type=token&scope=basic+public_content+follower_list+comments+relationships+likes

//code: ac2ce35a50514a1491533d8105c9dc5d

// https://api.instagram.com/oauth/authorize/?client_id=467af6bc7e75480881ba314941d37a91&redirect_uri=http://127.0.0.1&response_type=code

    // curl -F 'client_id=467af6bc7e75480881ba314941d37a91' \
    // -F 'client_secret=efc2ca7fefc84735abc450e4366adac5' \
    // -F 'grant_type=authorization_code' \
    // -F 'redirect_uri=http://127.0.0.1' \
    // -F 'code=73a653d502484633ba005f114c10c667' \
    // https://api.instagram.com/oauth/access_token

//234543206.467af6b.a77d34824c27423eb3c8c17f51497806

Instagram.init({
	client_id	: '467af6bc7e75480881ba314941d37a91',
	redirectURI : 'http://127.0.0.1',
	access_token : '234543206.467af6b.a77d34824c27423eb3c8c17f51497806'
})