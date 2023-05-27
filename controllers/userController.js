const User = require("../model/user");
const Member = require('../model/member')
const Admin = require('../model/admin')
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const passport = require('passport');
const admin = require("../model/admin");

exports.sign_up_get = asyncHandler(async (req, res, next) => {
  res.render("sign-up-form",{ errors: null });
});

exports.sign_up_post = [
  // Add validations using express-validator
  body("firstname").trim().isLength({ min: 1 }).withMessage("First name must be specified."),
  body("lastname").trim().isLength({ min: 1 }).withMessage("Last name must be specified."),
  body("username").trim().isLength({ min: 1 }).withMessage("Username must be specified."),
  body("password").trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
  body("username").custom(async (value) => {
    const user = await User.findOne({ username: value });
    if (user) {
      throw new Error("Username already exists.");
    }
    return true;
  }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
 
      res.render("sign-up-form", { errors: errors.array() });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const admin = await Admin.find().exec()
        console.log(admin)
      try {
    
        const user = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          password: hashedPassword,
          is_admin:req.body.secret_key==admin.secret_key?true:false,
          is_member: false,
        });
        const result = await user.save();
        res.redirect("/");
      } catch (err) {
        return next(err);
      }
    }
  })
];

exports.log_in_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
  
});

exports.log_out_post = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      next(err)
    } else {
      res.redirect('/');
    }
  });
};


exports.join_membership_get = asyncHandler(async (req,res,next)=>{
    res.render('join_membership')
})

exports.join_membership_post = asyncHandler(async (req, res, next) => {
    const secret_key = req.body.secretkey;
    const member = await Member.find().exec();

    console.log(member)
    if (secret_key==member[0].secret_key) {
      const updatedUser = await User.findByIdAndUpdate(
        req.query.userId,
        { is_member: true },
        { new: true }
      ).exec();
  
      res.redirect('/');
    } else {
    
      res.render('join_membership', { error: 'Incorrect secret key' });
    }
  });
  
