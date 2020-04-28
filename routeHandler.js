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

function editUrl(req, res) {
  if (isUrl(req.body.redirectUrl)) {
    urlModel.findOneAndUpdate({ identifier: req.body.identifier }, {
      redirectUrl: req.body.redirectUrl,
    }).then(() => {
      res.send('URL updated successfully.');
    });
  } else res.status(400).send('Invalid Redirect URL');
}

function deleteUrl(req, res) {
  urlModel.deleteOne({ identifier: req.body.identifier }).then(() => {
    res.send('Url deleted successfully.');
  });
}

function redirectReq(req, res) {
  urlModel.findOne({ identifier: req.params.identifier }).then((url) => {
    if (url) res.redirect(url.redirectUrl);
    else res.status(400).send('Unable to find URL to redirect to.');
  });
}

module.exports = {
  createUrl, editUrl, deleteUrl, redirectReq
};
