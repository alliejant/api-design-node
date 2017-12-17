var app = require("./server");
var request = require("supertest");
var expect = require("chai").expect;

// TODO: make tests for the other CRUD routes
// DELETE, UPDATE, PUT, GET ONE
// to run the test type mocha server/specs.js

describe("[LIONS]", function() {
  let lion = { id: "1", name: "a", pride: "b", age: "1", gender: "female" };

  it("should be able to get all lions", function(done) {
    request(app)
      .get("/lions")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an("array");
        done();
      });
  });

  it("should be able to add a lion", function(done) {
    request(app)
      .post("/lions")
      .send(lion)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function(err, resp) {
        expect(resp.body).to.be.an("object");
        done();
      });
  });

  it("should be able to get one lion", function(done) {
    request(app)
      .get("/lions/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an("object");
        expect(resp.body).to.deep.equal(lion);
        done();
      });
  });

  it("should be able to update a lion", function(done) {
    const updateLion = { pride: "c" };
    request(app)
      .put("/lions/1")
      .send(updateLion)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an("object");
        expect(resp.body.pride).to.equal("c");
        expect(resp.body.name).to.equal("a");
        done();
      });
  });

  it("should be able to delete a lion", function(done) {
    request(app)
      .delete("/lions/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an("object");
        done();
      });
  });

  it("should be have deleted lion from lions", function(done) {
    request(app)
      .get("/lions/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.deep.equal({});
        done();
      });
  });
});
