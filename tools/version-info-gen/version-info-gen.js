const { version } = require('../..//package.json');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');

exports.generate = () => {
  const prod = process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? true : false;
  const version_info = {
    version: prod ? version : `${version}.dev`,
    release_date_time: new Date(),
    env: process.env.NODE_ENV !== undefined ? process.env.NODE_ENV : 'undefined'
  };

  const file = resolve(__dirname, '..', '..', 'version-info.json');
  writeFileSync(
    file,
    `${JSON.stringify(version_info, null, 2)}
  `,
    { encoding: 'utf-8' }
  );

  console.log(`Wrote version info ${version_info.version} to ${relative(resolve(__dirname, '..', '..'), file)}`);
};
