// Execute as: mocha unauthRoutes.test.js

var assert = require('assert');

// Validate response codes on unauthorized endpoints
// requires default.json to run

const supertest = require('supertest');
const app = require('../server');
const api = supertest(app);

describe("Unauthorized routes", function () {
  it("should return healthy page", function (done) {
    api
      .get('/health')
      .expect(200)
      .end(function (err, res) {
        assert(err === null);
        assert(JSON.parse(res.text).healthy === true);
      });
    done();
  });

  it("should return home 401", function (done) {
    api
      .get('/')
      .expect(401);
    done();
  });

  it("should return api 401", function (done) {
    api
      .get('/api')
      .expect(401);
    done();
  });

  it("should return api endpoint 401", function (done) {
    api
      .get('/api/abc')
      .expect(401);
    done();
  });

  it("should return login 302", function (done) {
    api
      .get('/api/login')
      .expect(302);
    done();
  });

  it("should return logout 302", function (done) {
    api
      .get('/api/logout')
      .expect(302);
    done();
  });

  it("should return callback 302", function (done) {
    api
      .get('/api/callback')
      .expect(302);
    done();
  });
});
