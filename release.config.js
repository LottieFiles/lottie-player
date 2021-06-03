/*
 * Copyright 2020 Design Barn Inc.
 */

'use strict';

const pkg = require('./package.json');

const CHANGELOG_HEADER = `# Changelog
All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html), enforced with [semantic-release](https://github.com/semantic-release/semantic-release).
`;

const SUCCESS_COMMENT = `:tada: This \${issue.pull_request ? 'pull request is included' : 'issue is fixed'} in v\${nextRelease.version}, available on npm: [${pkg.name}@\${nextRelease.version}](https://www.npmjs.com/package/${pkg.name}).`;

/**
 * See:
 * https://semantic-release.gitbook.io/semantic-release/
 * https://github.com/semantic-release/npm
 * https://github.com/semantic-release/github
 * https://github.com/semantic-release/git
 * https://github.com/semantic-release/release-notes-generator
 * https://github.com/semantic-release/commit-analyzer
 * https://github.com/semantic-release/changelog
 */
module.exports = {
  branches: ['master', { name: 'beta', prerelease: true }],
  tagFormat: 'v${version}',
  ci: true,
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
      },
    ],
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle: CHANGELOG_HEADER,
      },
    ],
    '@semantic-release/git',
    [
      '@semantic-release/github',
      {
        message: 'chore(release): v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        assets: 'dist/*.tgz',
        successComment: SUCCESS_COMMENT,
        addReleases: 'bottom',
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
        tarballDir: 'dist',
      },
    ],
  ],
};
