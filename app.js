var express = require("express");
var redis = require("redis");
var app = express();
var client = redis.createClient();


// lpush adds one item to the list

app.get("/", function(req, res){
	client.lpush("visitors", req.ip, function(err, reply){
	res.send("you are visitor number " + 
		reply +
		" and your IP is "
		+ req.ip);

	});
});

// llen only shows the length of the list

app.get("/how-many", function(req, res){
	client.llen("visitors", function(err, visitorCount){
	res.send("there are  " + 
		visitorCount +
		" right now ")
	});
});

// llen only shows the length of the list

app.get("/most-recent", function(req, res){
	client.lindex("visitors", 0, function(err, mostResent){
	res.send("the most recent was" + mostResent);
	});
});

app.listen(3000);