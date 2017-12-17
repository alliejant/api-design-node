var router = require("express").Router();
var logger = require("../../util/logger");

// setup boilerplate route jsut to satisfy a request
// for building
router
	.route("/")
	.get(function(req, res) {
		logger.log("Hey from user!!");
		res.send({ ok: true });
	})
	.post(function(req, res) {
		logger.log("Hey from user!!");
		res.send({ ok: true });
	});

router
	.route("/:id")
	.get(function(req, res) {
		logger.log("Hey from user!!");
		res.send({ ok: true });
	})
	.patch(function(req, res) {
		logger.log("Hey from user!!");
		res.send({ ok: true });
	})
	.delete(function(req, res) {
		logger.log("Hey from user!!");
		res.send({ ok: true });
	});

module.exports = router;
