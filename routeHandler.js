const randomstring = require('randomstring');
const isUrl = require('is-url');
const { urlModel } = require('./models/index');

function generateUniqueUrl(redirectUrl, res) {
  const randomIdentifier = randomstring.generate(8);
  urlModel.create({ identifier: randomIdentifier, redirectUrl }).then(() => {
    res.send(process.env.SERVER_ROOT + randomIdentifier);
  }, () => {
    generateUniqueUrl(redirectUrl, res);
  });
}

function createUrl(req, res) {
  if (isUrl(req.body.redirectUrl)) generateUniqueUrl(req.body.redirectUrl, res);
  else res.status(400).send('Invalid Redirect URL');
}

function redirectReq(req, res) {
  urlModel.findOne({ identifier: req.params.identifier }).then((url) => {
    if (url) res.redirect(url.redirectUrl);
    else res.status(400).send('Unable to find URL to redirect to.');
  });
}

module.exports = { createUrl, redirectReq };
