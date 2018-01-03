#!/usr/bin/env node

'use strict';

const meow = require('meow');
const pkg = require('./package.json');
const fs = require('fs');
const parse = require('./lib/parse');
const validUrl = require('valid-url');

const cli = meow(
    `
    Usage
      $ backstop-generator <infile.json>
    Options
      --outfile, -o        Save the backstop config to this file.
      --paths, -p          Additional paths to pass into the configuration file.
    Examples
      $ backstop-crawl mypageurls.json
`,
    {
        alias: {
            o: 'outfile',
        },
    }
);

if (cli.input.length > 0) {
  if (validUrl.isUri(cli.input[0])){
    parse(cli.input[0]);
  } else {
    console.error('> Not a valid URL');
  }
  //if (fs.existsSync(cli.input[0])) {
  //parse(cli.input[0]);
  //}
  /* else {
        console.error(`> Error: "${cli.input[0]}" doesn't exist.`);
        process.exit(1);
    }
    */
} else {
    cli.showHelp();
}
