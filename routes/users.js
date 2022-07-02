var express = require('express');
var router = express.Router();
var User = require("../models/User");

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render( 'users/register');
});

/* Register User */
router.post('/register', async  function(req, res, next) {
  let user = new User(req.body);
  await user.save()
  res.redirect( '/');
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render( 'users/login');
});

/* GET logout user. */
router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.render( 'users/login');
});

/* GET users data for login. */
router.post('/login', async function(req, res, next) {
  let user = await User.findOne({email:req.body.email,password:req.body.password});
  if(!user)
    return res.redirect("/users/login");
  req.session.user = user;
  return res.redirect('/');
});

module.exports = router;
