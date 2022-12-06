const express = require("express");
const {
  home,
  createUser,
  createTodo,
  getTodos,
  editUser,
  deleteUser,
  getTodoById,
  loginUser,
} = require("../controler/index");
const auth = require("../middleware/auth");

const router = express.Router();
router.get("/", home);
// create  user
router.post("/createUser", createUser);
// login user
router.post("/login" , loginUser)
// create todo
router.post("/createTodo", auth, createTodo);
router.get("/getTodos",auth, getTodos);
router.get("/getsingletodo/:id", getTodoById);
router.put("/edituser/:id", editUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
