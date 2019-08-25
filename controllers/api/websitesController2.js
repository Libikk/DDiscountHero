const express = require('express');

const router = express.Router();
const { executeRawSQL } = require('../../sql/sqlServer');

const getWebsites = (req, res, next) => {
  executeRawSQL('SELECT * FROM discounthero.websites')
    .then(response => res.send(response))
    .catch(next);
};

router.get('/', getWebsites);

module.exports = router;
