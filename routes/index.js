const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', (req, res) => res.render('sign-up-form', {title: 'Create Account'}));

router.get('/login', (req, res) => res.render('login-form', {title: 'Login'}));

router.post('/signup', user_controller.create_account_post);

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}));

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
