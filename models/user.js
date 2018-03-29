const mongoose = require('mongoose');
const PasLoMo = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({});

userSchema.plugin(PasLoMo);

module.exports = mongoose.model('User', userSchema);