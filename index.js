const AWS = require('aws-sdk');
const _   = require('lodash');

AWS.config.update({ region: 'us-west-2' });

const ssm = new AWS.SSM();

const getParams = (token, opts) => new Promise((resolve, reject) => {

    if (token) opts.NextToken = token;

    ssm.getParametersByPath(opts).promise()
    .then(data => resolve(data))
    .catch(err => reject(err));

});

module.exports = getMoreParams = (Path, params=[], token) => {

  const opts = {
    Path
    Recursive: true,
    WithDecryption: true
  };

  console.log('getMoreParams token:', token !== undefined);
  return getParams(token, opts).then((data) => {

    params.push(data.Parameters);
    return (data.NextToken) ? getMoreParams(path, params, data.NextToken) : _.flatten(params)

  });

};
