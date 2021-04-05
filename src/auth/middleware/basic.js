'use strict';

const base64 = require('base-64');
const User = require('../models/users.js');


module.exports = async (req, res, next) => {
  if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Basic') { return _authError(next); }


  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');


  try {
    req.user = await User.authenticateBasic(user, pass)
    next();
  } catch (error) {
    res.status(403).send('Invalid Login');
  }

}

function _authError(next) {
  next('Sorry Invalid Login')
}

