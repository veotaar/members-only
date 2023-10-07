var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', (req, res) => res.render('sign-up-form', {title: 'Create Account'}));

router.get('/login', (req, res) => res.render('login-form', {title: 'Login'}));

module.exports = router;
