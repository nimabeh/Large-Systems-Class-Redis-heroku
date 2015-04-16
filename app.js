var express = require("express");
var app = express();

if (process.env.REDISTOGO_URL) {
	// inside if statement
var rtg   = require("url").parse(process.env.REDISTOGO_URL);
var client = require("redis").createClient(rtg.port, rtg.hostname);

client.auth(rtg.auth.split(":")[1]);
    // TODO: redistogo connection
} else {
    var client = require("redis").createClient();
}


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

app.listen(process.env.PORT || 3000);