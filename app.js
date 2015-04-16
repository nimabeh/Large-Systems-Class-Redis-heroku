var express = require("express");
var redis = require("redis");
var app = express();
var client = redis.createClient();

app.get("/", function(req, res){
	client.incr("visitors", function(err, reply){
	res.send("you are visitor number" + reply);

	});
});

app.listen(3000);