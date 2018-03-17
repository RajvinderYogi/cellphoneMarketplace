let express = require('express');
let router = express.Router();

//GET: apple/index
router.get('/', (req, res, next)=>{
res.render('apples/index',{ title: 'Apple Phones'})
});

//make public
module.exports = router;