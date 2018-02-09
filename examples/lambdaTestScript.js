const index      = require('./index.js');
const _          = require('lodash');
const argv       = require('minimist')(process.argv.slice(2)); //eslint-disable-line
const grabParams = require('parameter-grab');

// default settings. argv will override these.
const config = {
  start_datetime: new Date(),
  timeout: 10 // seconds
};

// override the default settings if not passed.
_.merge(config, argv);

const json    = require('./sample.json');
const context = require('./context')(config);

grabParams('/LOCAL/LAMBDA_FUNCTION')
.then(params => _.forEach(params, (param) => {

  const name = param.Name.split('/')[4];
  process.env[name] = param.Value;

}))
.then(() => index.handler(json, context, (err, results) => {

  if (err) console.log(`callback executed w/ error: ${err}`);
  else    console.log(`callback executed w/ results: ${results}`);
  process.exit();

}))
.catch(err => console.log('Error', err));
