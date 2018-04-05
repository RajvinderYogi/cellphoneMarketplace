let express = require('express');
let router = express.Router();
let Samsung = require('../models/samsung');
let globalFunction = require('../config/globalFunction')

//GET: index
router.get('/', (req, res, next) => {
    //get data from db
    Samsung.find((err,samsungs)=>{
        if (err){
            console.log(err);
        }
        else {
            res.render('samsungs/index', {title:"Samsung Phones", samsungs:samsungs, user:req.user});
        }
    });
});

//GET: addPhone
router.get('/addPhone', globalFunction.SignedIn,(req, res, next)=>{
    res.render('samsungs/addPhone', { title:'Add new Phone', user: req.user});
});

//POST: Samsungs/addPhone
router.post('/addPhone', globalFunction.SignedIn,(req, res, next)=>{
    //save the new phone here
    Samsung.create({
        model: req.body.model,
        color: req.body.color,
        usage:req.body.usage,
        price:req.body.price
    }, (err, samsungs)=>{
        if (err){
            console.log(err);
        }
        else {
            res.redirect('/samsungs')
        }
    });
});
//GET: Delete
router.get('/delete/:_id', globalFunction.SignedIn,(req, res, next) =>{
    let _id= req.params._id;

    Samsung.remove({_id: _id}, (err) =>{
        if(err){
            console.log(err);
        }
        else {
            res.redirect('/samsungs');
        }
    });
});

//GET: Edit
router.get('/edit/:_id', globalFunction.SignedIn,(req, res, next)=>{
    let _id= req.params._id;
    Samsung.findById(_id, (err, samsungs)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('samsungs/edit', {title:'Update the ad', samsungs: samsungs, user: req.user});
        }
    });
});
//POST: Samsungs/edit
router.post('/edit/:_id', globalFunction.SignedIn,(req, res, next)=>{
    let _id = req.params._id;

    Samsung.update({_id:_id},
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
                res.redirect('/samsungs')
            }
        });
});
    module.exports = router;