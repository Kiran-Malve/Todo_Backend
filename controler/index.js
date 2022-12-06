// LOGIC, BL
const User = require("../modal/index");
const UserAuth = require("../modal/userSchema");
const userTodo = require("../modal/index")
bcrypt = require("bcrypt");
(jwt = require("jsonwebtoken")),
  (exports.home = (req, res) => {
    res.send("Hello  Alpha ");
  });

  

// create new user
exports.createUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    // Check user exists or not
    const emailExists = await UserAuth.findOne({ email: req.body.email });
    if (emailExists) {
      res.status(400).send("Email Already Exists");
    } else if (userName && email && password) {
      // Save User Details

      const user = await UserAuth.create({ userName, email, password });
      var copy = Object.assign({}, user);
      delete copy._doc.password; // delete the password key from user details
      const payload = {
        user: {
          id: user._id,
        },
      };
      // Create jwt token
      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          if (token) {
            res
              .status(201)
              .json({ message: "User registered successfully", user, token });
          }
        }
      );
    } else {
      res.status(401).json({ message: "please fill the required fill" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  const { password, email } = req.body;
  try {
    const userExists = await UserAuth.findOne({ email: email });
    if (userExists) {
      const isMatch = await bcrypt.compare(password, userExists.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !",
        });
      delete userExists.password;
      const payload = {
        user: {
          id: userExists._id,
        },
      };
      var copy = Object.assign({}, userExists);
      delete copy._doc.password; // delete the password key from user details
      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          if (token) {
            res
              .status(201)
              .json({ message: "User Login successfully", userExists, token });
          }
        }
      );
    } else {
      res
              .status(400)
              .json({ message: "Email Not Exists"});
    
    }
  } catch (error) {
    console.log(error);
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      throw new Error("title and description are Required");
    }
    const userExits = await User.findOne({ title });
    if (userExits) {
      throw new Error("Todo Already Exists");
    }
    // Inserting into the Database
    const todo = await userTodo.create({ title, description });
    res.status(201).json({
      success: true,
      message: "Todo Created Successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getTodos = async (req, res) => {
  try {
      const search = req?.query?.search?.toLowerCase() || "";
       let asending;
      if (req?.query?.date==="asc") {
        asending = 1;
      } else{
        asending = -1;
      }      
      let articles = await User.find({title: {$regex: search , $options:"i" }}).sort({ createdAt: asending });
       res.json({
        success: true,
        articles,
      });
    
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    if (req.params.id) {
      const singleTodo = await User.findOne();
      if (singleTodo) {
        res.status(200).json({
          success: true,
          message: "Todo Successfully",
          singleTodo,
        });
      }
    }
  } catch (error) {
    console.log(error)
  }
};

exports.editUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req?.params?.id, req?.body);
    res.status(200).json({
      success: true,
      message: "Todo updated Successfully",
      user
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    res.status(200).json({
      success: true,
      message: "Todo Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
