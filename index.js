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
    Views configuration:
      https://gist.githubusercontent.com/porkloin/fd2a5f22a01cc84fa3d13c35e4c6094b/raw/8d3ccee108665ed0a40973ad081647e978dfe6d0/views.view.content_json_export.yml
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
