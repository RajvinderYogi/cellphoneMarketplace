let express = require('express');
let router = express.Router();
let Apple = require('../models/apple');

//GET: apple/index
router.get('/', (req, res, next) => {
    //get data from db
    Apple.find((err,apples)=>{
        if (err){
            console.log(err);
        }
        else {
            res.render('apples/index', {title:"Apple Phones",apples:apples});
        }
    });
});

//GET: apples/addPhone
router.get('/addphone', (req, res, next)=>{
    res.render('apples/addphone', { title:'Add new Phone'});
});

//POST: apples/addPhone
router.post('/addphone', (req, res, next)=>{
    //save the new phone here
    Apple.create({
        model: req.body.model,
        color: req.body.color,
        usage:req.body.usage,
        price:req.body.price
    }, (err, apple)=>{
        if (err){
            console.log(err);
        }
        else {
            res.redirect('/apples')
        }
    });
});

//GET: Delete record
router.get('/delete/:_id', (req, res, next) =>{
    let _id= req.params._id;

    Apple.remove({_id: _id}, (err) =>{
        if(err){
            console.log(err);
        }
        else {
            res.redirect('/apples');
        }
    });
});
//make public
module.exports = router;