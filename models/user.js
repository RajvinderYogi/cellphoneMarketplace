const mongoose = require('mongoose');
const PasLoMo = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
    googleId: String
});

userSchema.plugin(PasLoMo);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);