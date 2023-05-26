const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname:{type:String,required:true,minLength:1,maxLength:20},
    lastname:{type:String,required:true,minLength:1,maxLength:20},
    username:{type:String,required:true,minLength:1,maxLength:20},
    password:{type:String,required:true,minLength:8,maxLength:30},
    is_member:{type:Boolean,required:true},
    is_admin:{type:Boolean,required:true}
});

module.exports = mongoose.model('User',UserSchema);