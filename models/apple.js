//mongoose reference
let mongoose = require ('mongoose');

//Apple phone schema
let appleSchema = new mongoose.Schema({
   model:{
       type: String,
       required:"Please enter the model of phone"
   },
    color:{
       type: String
    },
    usage:{
       type: String,
        required:"Please enter either phone is new or used"
    },
    price:{
       type: Number,
        required:"You ust enter the price of this phone"
    }
});
//make public
module.exports = mongoose.model('Apple', appleSchema);
