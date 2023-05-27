const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema(
  {
    secret_key: { type: String, required: true, minLength: 1, maxLength: 100 },
    
  }
);

module.exports = mongoose.model("Member", MemberSchema);