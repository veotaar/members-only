const express = require('express');
const router = express.Router();

const isAuth = require('../lib/authMiddleware').isAuth;
const isMember = require('../lib/authMiddleware').isMember;

const user_controller = require('../controllers/userController');
const message_controller = require('../controllers/messageController');
const passport = require('passport');

/* GET home page. */
router.get('/', message_controller.get_messages);

router.get('/signup', (req, res) => res.render('sign-up-form', {title: 'Create Account'}));

router.get('/login', (req, res) => {
  console.log(req.session.messages);
  res.render('login-form', { title: 'Login', errors: req.session.messages });
});

// protected route
router.get('/member', isAuth, (req, res) => {
  res.render('member', {title: 'Become a member!'});
})

// protected route
router.get('/admin', isAuth, isMember, (req, res) => {
  res.render('admin', {title: 'Become an admin!'});
})

// protected route
router.get('/new', isAuth, isMember, (req, res) => {
  res.render('new', {title: 'Send a message!'});
})

router.post('/signup', user_controller.create_account_post);

router.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', failureMessage: 'Incorrect username or password.'}));

router.post('/member', user_controller.become_member_post);

router.post('/admin', user_controller.become_admin_post);

router.post('/new', message_controller.create_message_post);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
