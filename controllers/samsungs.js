let express = require('express');
let router = express.Router();

    router.get('/', (req, res, next)=> {
    res.render('samsungs/index', {title: 'Samsung Phones'})
});

    module.exports = router;