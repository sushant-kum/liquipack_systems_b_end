const { gitDescribeSync } = require('git-describe');
const { version } = require('./package.json');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');

const gitInfo = gitDescribeSync({
  dirtyMark: false,
  dirtySemver: false
});

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  gitInfo.version = version;
} else {
  gitInfo.version = `${version}.dev`;
}
gitInfo.release_date_time = new Date();

const file = resolve(__dirname, 'version-info.json');
writeFileSync(
  file,
  `${JSON.stringify(gitInfo, null, 2)}
`,
  { encoding: 'utf-8' }
);

console.log(`Wrote version info ${gitInfo.raw} to ${relative(resolve(__dirname, '..'), file)}`);
