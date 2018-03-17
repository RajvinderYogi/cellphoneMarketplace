//mongoose reference
let mongoose = require ('mongoose');

//Apple phone schema
let appleSchema = new mongoose.Schema({
   model:{
       type: String
   },
    color:{
       type: String
    },
    usage:{
       type: String
    },
    price:{
       type: Number
    }
});
//make public
module.exports = mongoose.model('Apple', appleSchema);
