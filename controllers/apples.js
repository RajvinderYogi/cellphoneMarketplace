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
router.get('/addPhone', (req, res, next)=>{
    res.render('apples/addPhone', { title:'Add new Phone'});
});

//POST: apples/addPhone
router.post('/addPhone', (req, res, next)=>{
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

//GET: Edit
router.get('/edit/:_id', (req, res, next)=>{
    let _id= req.params._id;
    Apple.findById(_id, (err, apples)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('apples/edit', {
                title:'Update the ad',
                apples: apples,
            });
        }
    });

});

//POST: /apples/edit
router.post('/edit/:_id', (req, res, next)=>{
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