var fs = require('fs'),
	request = require('request'),
	async = require('async'),
	API = require('./lib/lovebizhiapi.js');

var categories = [API.categories.landscape, API.categories.plant];
var screenWidth = 2560;
var screenHeight = 1600;
var maxFileCount = 100;

var api = new API(screenWidth, screenHeight);

var savePath = 'wallpapers';

if (process.argv.length >= 3){
	var possiblePath = process.argv[2];
	if(fs.existsSync(savePath)){
		if(fs.statSync(savePath).isDirectory()){
			savePath = possiblePath;
		}
	} else {
		savePath = possiblePath;
	}
}

var picIds = [];

var fetchApi = function(category, callback){
	request(api.getUrl(category), function(error, response, body){
		if(!error){
			var body = JSON.parse(body);
			if(body.data && body.data.length > 0){
				body.data.forEach(function(item, index){
					if(item.file_id){
						if(picIds.indexOf(item.file_id) < 0){
							picIds.push(item.file_id);
						}
					}
				});
			}
		}
		callback();
	});
};

var finishedPicCount = 0;

var getPic = function(picId, callback){
	var fileName = savePath + '/' + api.fileName(picId);
	if(fs.existsSync(fileName)){
		finishedPicCount++;
		callback();
		return;
	}
	var url = api.fileUrl(picId);
	request({url: url, encoding: null}, function(error, res, body){
		if(finishedPicCount >= maxFileCount - 1){
			finishedPicCount++;
			callback();
			return;
		}
		finishedPicCount++;
		if(error){
			console.log('pic ' + picId + ' download error: ' + error);
			callback(error);
		}else{
			fs.writeFile(fileName, body, 'binary', function(error){
				if(error){
					console.log('pic ' + picId + ' save error: ' + error);
					fs.unlinkSync(fileName);
					callback(error);
				}else{
					console.log('pic ' + picId + ' saved ' + finishedPicCount + '/' + picIds.length);
					callback();
				}
			});
		}
	});
};

var prepareOutputDir = function(){
	if(fs.existsSync(savePath)){
		if(!fs.statSync(savePath).isDirectory()){
			throw 'output path is a file';
		}
	} else {
		fs.mkdirSync(savePath);
	}
};

var finalPurge = function(){
	var files = fs.readdirSync(savePath);
	var fileCount = files.length;
	console.log('file count ' + fileCount);
	if(fileCount <= maxFileCount){
		return;
	}
	files = files.sort(function(a, b) {
               return fs.statSync(savePath + '/' + a).mtime.getTime() - 
                      fs.statSync(savePath + '/' + b).mtime.getTime();
           });
	async.each(files, function(file, callback){
		if(fileCount <= maxFileCount * 0.7){
			callback();
			return;
		}
		if(file.indexOf('.jpg') == (file.length - '.jpg'.length)){
			fs.unlinkSync(savePath + '/' + file);
			fileCount--;
			console.log(file + ' deleted');
			callback();
		} else {
			fileCount--;
			callback();
		}
	}, function(error){

	});
}

prepareOutputDir();
async.each(categories, fetchApi, function(error){
		if(!error){
			console.log("success got " + picIds.length + " picIds");
		}else{
			console.log("error : " + error);
		}
		if(picIds.length > 0){
			async.each(picIds, getPic, function(error){
				if(!error){
					console.log("final success");
				} else {
					console.log("error : " + error);
				}
				finalPurge();
			});
		}
	});
