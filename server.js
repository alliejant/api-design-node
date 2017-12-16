// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
express = require("express");
fs = require("fs");

app = express();

let jsonData = { count: 12, message: "hey" };

app.get("/", (req, res, next) => {
	fs.readFile("./index.html", "utf8", function(err, data) {
		if (err) {
			next(err);
		}
		res.send(data);
	});
});

app.get("/data", (req, res, next) => {
	res.json(jsonData);
});

app.use((err, req, res, next) => res.send(err.stack));

app.listen(3000, () => {
	console.log("listening on port 3000");
});
