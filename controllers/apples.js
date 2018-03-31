let express = require('express');
let router = express.Router();
let Apple = require('../models/apple');
let  globalFunction =require('../config/globalFunction');

//GET: apple/index
router.get('/', (req, res, next) => {
    //get data from db
    Apple.find((err,apples)=>{
        if (err){
            console.log(err);
        }
        else {
            res.render('apples/index', {title:"Apple Phones",apples:apples, user:req.user});
        }
    });
});

//GET: apples/addPhone
router.get('/addPhone', globalFunction.SignedIn,(req, res, next)=>{
    res.render('apples/addPhone', { title:'Add new Phone', user: req.user});
});

//POST: apples/addPhone
router.post('/addPhone', globalFunction.SignedIn,(req, res, next)=>{
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

//GET: Delete
router.get('/delete/:_id', globalFunction.SignedIn,(req, res, next) =>{
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

//GET: /apples/edit
router.get('/edit/:_id', globalFunction.SignedIn,(req, res, next)=>{
    let _id= req.params._id;
    Apple.findById(_id, (err, apples)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('apples/edit', {title:'Update the ad', apples: apples, user: req.user});
        }
    });

});

//POST: /apples/edit
router.post('/edit/:_id', globalFunction.SignedIn,(req, res, next)=>{
    let _id = req.params._id;

    Apple.update({_id:_id},
        {$set:{
                model: req.body.model,
                color: req.body.color,
                usage: req.body.usage,
                price: req.body.price
            }}, null, (err)=>{
            if (err){
                console.log(err);
            }
            else {
                res.redirect('/apples')
            }
        });
});
//make public
module.exports = router;