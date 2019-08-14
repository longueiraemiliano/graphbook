const assert = require("assert");
const request = require("request");
const expect = require("chai").expect;
const should = require("chai").should();
require("babel-plugin-require-context-hook/register")();

describe("Graphbook application test", function() {
  var app;
  var authToken;
  this.timeout(50000);

  before(function(done) {
    app = require("../src/server").default;
    app.on("listening", function() {
      done();
    });
  });

  after(function(done) {
    app.close(done);
  });

  it("renders and serves the index page", function(done) {
    request("http://localhost:8000", function(err, res, body) {
      should.not.exist(err);
      should.exist(res);
      expect(res.statusCode).to.be.equal(200);
      assert.ok(body.indexOf("<html") !== -1);
      done(err);
    });
  });

  describe("404", function() {
    it("redirects the user when not matching path is found", function(done) {
      request(
        {
          url: "http://localhost:8000/path/to/404"
        },
        function(err, res, body) {
          should.not.exist(err);
          should.exist(res);
          expect(res.statusCode).to.be.equal(200);
          assert.ok(res.req.path === "/");
          assert.ok(body.indexOf("<html") !== -1);
          assert.ok(body.indexOf('class="authModal"') !== -1);
          done(err);
        }
      );
    });
  });

  describe("authentication", function() {
    it("redirects the user when not logged in", function(done) {
      request(
        {
          url: "http://localhost:8000/app"
        },
        function(err, res, body) {
          should.not.exist(err);
          should.exist(res);
          expect(res.statusCode).to.be.equal(200);
          assert.ok(res.req.path === "/");
          assert.ok(body.indexOf("<html") !== -1);
          assert.ok(body.indexOf('class="authModal"') !== -1);
          done(err);
        }
      );
    });

    it("allows the user to sign up", function(done) {
      const json = {
        operationName: null,
        query: `
          mutation signup($username: String!, $email : String!, $password : String!) { 
            signup(username: $username, email: $email, password : $password) { 
              token 
            }
          }`,
        variables: {
          email: "mocha@test.com",
          username: "mochatest",
          password: "123456789"
        }
      };

      request.post(
        {
          url: "http://localhost:8000/graphql",
          json: json
        },
        function(err, res, body) {
          should.not.exist(err);
          should.exist(res);
          expect(res.statusCode).to.be.equal(200);
          body.should.be.an("object");
          body.should.have.property("data");
          authToken = body.data.signup.token;
          done(err);
        }
      );
    });

    it("allows the user to query all chats", function(done) {
      const json = {
        operationName: null,
        query: "query {chats {id users {id avatar username}}}",
        variables: {}
      };

      request.post(
        {
          url: "http://localhost:8000/graphql",
          headers: {
            Authorization: authToken
          },
          json: json
        },
        function(err, res, body) {
          should.not.exist(err);
          should.exist(res);
          expect(res.statusCode).to.be.equal(200);
          body.should.be.an("object");
          body.should.have.property("data");
          body.data.should.have.property("chats").with.lengthOf(0);
          done(err);
        }
      );
    });
  });
});
