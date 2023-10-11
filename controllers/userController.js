const User = require('../models/user');
const bcrypt = require('bcryptjs');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.create_account_post = [
  body('username', 'username must contain at least 4 characters')
    .trim()
    .isLength({ min: 4, max: 32 })
    .escape(),

  body('password', 'Password must contain at least 8 characters')
    .isLength({ min: 8, max: 32 })
    .escape(),

  body('password-confirm', 'Password must contain at least 8 characters')
    .isLength({ min: 8, max: 32 })
    .escape(),

  body('username').custom(async (value) => {
    const userExists = await User.isUsernameExists(value);
    if (userExists) {
      throw new Error('Username already in use');
    }
  }),

  body('password-confirm').custom((value, { req }) => {
    return value === req.body.password;
  }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      res.render('sign-up-form', {
        title: 'Create Account',
        errors: errors.array(),
      })
    } else {
      // data is valid, hash password and save
      bcrypt.hash(req.body.password, 12, async (err, hashedPassword) => {
        if(err) {
          return next(err);
        }

        try {
          const user = new User({
            username: req.body.username,
            password: hashedPassword,
            isMember: false,
            isAdmin: false
          });

          const result = await user.save();
          res.redirect('/');
        } catch (err) {
          return next(err);
        }
      })
    }
  })
];