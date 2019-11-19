const whitelist = ['https://liquipack.sushantk.com', 'https://liquipack.cf', 'https://testbed.liquipack.cf'];

exports.options = {
  // origin: function(origin, callback) {
  //   if (
  //     (process.env.NODE_ENV === 'production' && whitelist.includes(origin)) ||
  //     process.env.NODE_ENV !== 'production'
  //   ) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error(`Not allowed by CORS. Origin: ${origin}`));
  //   }
  // },
  origin: whitelist,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
