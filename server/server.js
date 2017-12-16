// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var _ = require("lodash");

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static("client"));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var lions = [{ name: "n", id: 0, pride: "a", age: 10, gender: "f" }];
var id = 0;

class Lion {
	constructor(name, age, pride, gender) {
		this.name = name;
		this.id = id;
		this.age = age;
		this.pride = pride;
		this.gender = gender;
	}
}

// TODO: make the REST routes to perform CRUD on lions
app.get("/lions", (req, res, next) => {
	res.status(200).json(lions);
});

app.post("/lions", (req, res, next) => {
	id++;
	const lion = new Lion(...req.body);
	lions.push(lion);
	res.status(201).json(lion);
});

app.get("/lions/:id", (req, res, next) => {
	const lion = lions.find(e => e.id === req.params.id);
	if (lion) res.status(200).json(lion);
	else next(new Error("no such thing"));
});

app.patch("/lions/:id", (req, res, next) => {
	const lion = lions.find(e => e.id === req.params.id);
	if (lion) {
		lion.name = req.body.name;
		lion.age = req.body.age;
		lion.pride = req.body.pride;
		lion.gender = req.body.gender;
		res.status(200).send(lion);
	} else next(new Error("no such thing"));
});

app.delete("/lions/:id", (req, res, next) => {
	const lionIndex = lions.findIndex(e => e.id === req.params.id);
	const lion = lions[lionIndex];
	if (lion) {
		lions.splice(lionIndex, 1);
		res.status(200).send(lion);
	} else next(new Error("no such thing"));
});

app.use((err, req, res, next) => {
	res.send(err);
});

app.listen(3000);
console.log("on port 3000");
