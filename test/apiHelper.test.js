// Execute as: mocha apiHelper.test.js

var assert = require('assert');
const apiHelpers = require('../utils/apihelpers')

describe('buildRequestOptions', () => {
  const ourKey = "openit";
  var result = apiHelpers.buildRequestOptions("somedummy", "a=b", { host: "http://hello.world", key: ourKey });
  it('should return an options object with an authorization token', () => {
    assert(typeof result === 'object');
    assert(result.hasOwnProperty('url'));
    assert(typeof result.url === 'string');
    assert(result.hasOwnProperty('headers'));
    assert(typeof result.headers === 'object');
  });

  it('looks like an authorization token with our key in it', () => {
    assert(typeof result.headers === 'object');
    assert(result.headers.hasOwnProperty('Authorization'));
    assert(typeof result.headers.Authorization === 'string');
    assert(result.headers.Authorization.toLowerCase().indexOf('token ') > -1);
    assert(result.headers.Authorization.indexOf(ourKey) > -1);
  });
})

describe('parseTargetEndpoint', () => {
  var result = apiHelpers.parseTargetEndpoint("someurl/dummy");
  it('should return a string', () => {
    assert(typeof result === 'string');
  });
  it('should only contain the first part of the param', () => {
    assert(result === 'someurl');
  });
  it('does not contain a URL separator', () => {
    assert(result.indexOf('/') === -1);
  });
})
