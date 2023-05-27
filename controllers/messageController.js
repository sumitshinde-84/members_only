const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Message = require('../model/message')

exports.create_message_get = asyncHandler(async (req,res,next)=>{
    res.render('create_message')
})

exports.show_message_list =asyncHandler(async (req, res, next)=>{
    const message =await Message.find().populate('author').exec()
    res.render('index',{user:req.user,messages:message})
})

exports.create_message_post = asyncHandler(async (req,res,next)=>{
     const userId = req.query.userId;

     const message = new Message({
        title:req.body.title,
        message:req.body.message,
        author:userId
     })

     const result = await message.save()
     res.redirect('/')
})

exports.message_delete_get =  asyncHandler(async (req,res,next)=>{
    res.render('delete_message')
})

exports.message_delete_post = asyncHandler(async (req, res, next) => {
    const messageId = req.query.messageId;
  
    try {
     const message = await Message.findByIdAndRemove(messageId).exec();
     console.log(message)
      res.redirect('/');
    } catch (err) {
      return next(err);
    }
  });