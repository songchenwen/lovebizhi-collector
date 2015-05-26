var url = "http://api.lovebizhi.com/macos_v4.php?a=category&tid={category}&device=105&uuid=436e4ddc389027ba3aef863a27f6e6f9&mode=0&retina=1&client_id=1008&device_id=31547324&model_id=105&size_id=0&channel_id=70001&screen_width={width}&screen_height={height}&version_code=19&order=newest&color_id=3";

API = function(width, height){
	this.width = width;
	this.height = height;
}

API.categories = {
	moviestar  : 1,
	landscape  : 2,
	beauty     : 3,
	plant      : 4,
	animal     : 5,
	game       : 6,
	cartoon    : 7,
	festival   : 8,
	car        : 798,
	food       : 1546,
	sport      : 1554
};

API.prototype.getUrl = function(category){
	return url.replace('{category}', category).replace('{width}', this.width).replace('{height}', this.height);
}

API.prototype.fileName = function(id){
	return '' + id + ',' + this.width + ',' + this.height + '.jpg';
};


API.prototype.fileUrl = function(id){
	return 'http://s.qdcdn.com/c/' + this.fileName(id);
};

module.exports = API;
