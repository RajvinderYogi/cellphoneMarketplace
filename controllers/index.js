var express = require('express');
var router = express.Router();
let passport =require('passport');
let User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cell Phone Marketplace', message:'Sell and view the cell phones here' });
});
router.get('/register', (req, res, next)=>{
    res.render('register', {
        title:'Register'
    });
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
            res.redirect('/');

        }
    });
});

module.exports = router;
