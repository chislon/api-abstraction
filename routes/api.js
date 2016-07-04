const apiHelpers = require('../utils/apiHelpers')

const config = require('config');
const apiConfig = config.get('API');

const request = require('request');
const qs = require('querystring')

// mergeParams retains all params as single continguous string
const router = require('express').Router({ mergeParams: true });

// wildcard match api routes to forward all requests
router.get('/*', (req, res) => {
  // when there are params
  if (req.params && req.params[0] &&
    apiConfig.endpoints.hasOwnProperty(apiHelpers.parseTargetEndpoint(req.params[0]))) {
    accessAPI(req, res);
  } else {
    res.status(404)
      .send('Unconfigured ' + apiConfig.name
      + ' endpoint, pick from: '
      + JSON.stringify(Object.keys(apiConfig.endpoints)));
  }
});

// do a request to the API
function accessAPI(req, res) {
  // do the request
  request
    .get(apiHelpers.buildRequestOptions(req.params[0], qs.stringify(req.query), apiConfig),
    (error, response, body) => {
      if (!error) {
        // TODO: response code and body currently pass-through, 
        // parse and manipulate body object as desired
        res.status(response.statusCode)
          .set("Connection", "close")
          .send(body);
      } else {
        res.status(500)
          .send('Cannot reach remote API');
      }
    });
}
module.exports = router;
