const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
   title:{type:String,required:true,minLength:1,maxLength:100},
   message:{type:String,required:true,minLength:1,maxLength:100},
   author:{type:mongoose.SchemaType.ObjectId,required:true,ref:'User'},
   
},{timestamps:true});

module.exports = mongoose.model('Message',MessageSchema);