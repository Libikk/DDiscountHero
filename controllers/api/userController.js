const express = require('express');
const bcrypt = require('bcryptjs');
const { validate, schema } = require('../../middleware/requestValidators/requestSchema');
const throwInvalid = require('../../middleware/requestValidators/requestValidator');

const router = express.Router();
const { sqlQuery, mapKeysToParams } = require('../../sql/sqlServer');
const passport = require('../../passportStrategy');

const updateUserDetails = async (req, res, next) => {
  const { body: { password, userName }, user: { userId } } = req;
  const params = {
    userId,
    password: null,
    userName: null,
  };

  if (password) params.password = await bcrypt.hash(password, 10);
  if (userName) params.userName = userName;

  sqlQuery('updateUserDetails', mapKeysToParams(params))
    .then((response) => {
      const isUpdated = response[0].changedRows || response[1].changedRows;

      if (isUpdated) return res.sendStatus(200);
      next(Object.assign(new Error(), { name: 'INVALID_VALUE' }));
    })
    .catch(next);
};

const updateUserPushNotificationToken = (req, res, next) => {
  const { body: { token }, user: { userId } } = req;

  sqlQuery('updateUserPushNotificationToken', mapKeysToParams({ token, userId }))
    .then(() => res.sendStatus(200))
    .catch(next);
};

router.post('/updateUserDetails', passport.authenticate('jwt', { session: false }), validate(schema['POST:/api/user/updateUserDetails']), throwInvalid, updateUserDetails);
router.post('/updateUserPushNotificationToken', passport.authenticate('jwt', { session: false }), validate(schema['POST:/api/user/updateUserPushNotificationToken']), throwInvalid, updateUserPushNotificationToken);

module.exports = router;
