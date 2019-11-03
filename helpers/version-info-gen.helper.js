const { version } = require('../package.json');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');

exports.generate = function() {
  const version_info = {};

  if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    version_info.version = version;
  } else {
    version_info.version = `${version}.dev`;
  }
  version_info.release_date_time = new Date();
  version_info.env = process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : 'undefined';

  const file = resolve(__dirname, '..', 'version-info.json');
  writeFileSync(
    file,
    `${JSON.stringify(version_info, null, 2)}
`,
    { encoding: 'utf-8' }
  );

  console.log(`Wrote version info ${version_info.version} to ${relative(resolve(__dirname, '..'), file)}`);
};
