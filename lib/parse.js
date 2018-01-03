'use strict';

const request = require('request');
const path = require('path');
const fs = require('fs');
const ora = require('ora');
const mkpath = require('mkpath');
const jsonfile = require('jsonfile');
const normalurl = require('normalize-url');
//const limitSimilar = require('./limit-similar');

const dirname = path.dirname;
const confPath = path.resolve(process.cwd(), 'backstop.template.json');
const defaultConf = fs.existsSync(confPath)
    ? JSON.parse(fs.readFileSync(confPath))
    : require('./backstop.template.json');

/**
 * Stash the default scenario from the template then delete it
 * as defaultScenario isn't a valid key for backstop.json
 */
const defaultScenario = defaultConf.defaultScenario;
delete defaultConf.defaultScenario;

module.exports = parse;
function parse(url, flags) {
  const spinner = ora('Loading url')
    let outfile = './backstop.json';
    request({
      url: url,
      json: true
    }, (error, response, body) => {
      defaultConf.scenarios = body;
      const outPath = dirname(outfile);
      mkpath(outPath, mkpathErr => {
          jsonfile.writeFile(
              outfile,
              defaultConf,
              { spaces: 2 },
              jsonfileErr => {
                  if (jsonfileErr) {
                      spinner.text = jsonfileErr;
                      spinner.fail();
                  } else {
                      spinner.text = 'backstop.js generated';
                      spinner.succeed();
                  }
              }
          );
      });
  });
  spinner.start();
}

