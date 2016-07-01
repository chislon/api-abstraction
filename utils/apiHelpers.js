// parse target endpoint when given the whole param text
exports.parseTargetEndpoint = (param) => {
  const separatorLocation = param.indexOf('/');
  return targetEndpoint = separatorLocation > -1 ? param.substr(0, separatorLocation) : param;
}

// url has entire params string and all query strings, 
// header contains the API key from config
exports.buildRequestOptions = (paramsText, queryText, apiConfig) => {
  return {
    url: apiConfig.host + '/' + paramsText + "?" + queryText,
    headers: {
      'Authorization': 'Token ' + apiConfig.key
    }
  };
}