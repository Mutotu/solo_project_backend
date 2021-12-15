const userRouter = require("express").Router();
const userController = require("../controllers/userController");

userRouter.post("/signup", userController.create);
userRouter.get("/signin", userController.findUser);
userRouter.delete("/delete/:id", userController.deleteUser);
userRouter.put("/update/:id", userController.updateUsername);
module.exports = userRouter;
