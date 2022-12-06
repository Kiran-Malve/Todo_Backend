const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userLoginSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: [true, "user name is required"],
    },
    email: {
      type: String,
      require: [true, "email is required"],
    },
    password: {
      type: String,
      require: [true, "password is required"],
    },
  },
  { timestamps: true }
);

userLoginSchema.pre(`save`, async function(next) {
  if(!this.isModified(`password`)) {
  next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

  
  

module.exports = mongoose.model("loginUser", userLoginSchema);


