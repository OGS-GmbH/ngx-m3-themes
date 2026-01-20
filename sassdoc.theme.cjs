const extras = require("sassdoc-extras");

/* eslint-disable-next-line require-await */
module.exports = async function (_dest, ctx) {
  return extras.markdown(ctx);
};
