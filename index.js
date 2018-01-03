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
      $ drupal-backstop-generator <infile.json>
    Examples
      $ drupal-backstop-generator http://my.drupal.local/all-content-json
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
} else {
    cli.showHelp();
}
