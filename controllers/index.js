var express = require('express');
var router = express.Router();
let passport =require('passport');
let User = require('../models/user');


/* GET: /homepage */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cell Phone Marketplace', message:'Sell and view the cell phones here', user: req.user });
});

//GET: / register
router.get('/register', (req, res, next)=>{
    res.render('register', {title:'Register', user: req.user});
});

//POST: /register
router.post('/register', function (req, res, next) {
    User.register(new User ({
        username: req.body.username,
    }),req.body.password, (err, user) => {
        if (err) {
            res.render('register',{title:'error'});
        }
        else {
            res.redirect('/signin');
        }
    });
});

//GET: /Sign in

router.get('/signin', (req, res, next)=>{

    let messages = req.session.messages || [];

    res.render('signin', {title:'Sign in Page', messages: messages, user: req.user});
});

//POST: /Sign In
router.post('/signin', passport.authenticate('local',{
    successRedirect: '/apples',
    failureRedirect: '/signin',
    failureMessage:'Wrong Credentials'
}));

//GET: /Sign out
router.get('/signout', (req, res, next)=>{
    req.session.messages = [];
    req.logout();
    res.redirect('/')
});


//GET: / Google
router.get('/google', passport.authenticate('google',{scope:['profile','email'],}));

//GET: /callback
router.get('/google/callback', passport.authenticate('google', {
        // if google authentication fails
        failureRedirect: '/signin',
        failureMessage: 'Invalid Login',
        scope: 'email',
    }),
    // redirect after sucessfull authentication
    (req, res, next) => {
        res.redirect('/apples');
    }
);
module.exports = router;
