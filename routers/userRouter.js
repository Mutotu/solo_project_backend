const userRouter = require("express").Router();
const userController = require("../controllers/userController");

userRouter.post("/signup", userController.create);
userRouter.post("/signin", userController.findUser);
userRouter.delete("/delete/:id", userController.deleteUser);
userRouter.put("/update", userController.updateBike);
///
userRouter.get("/verify", userController.verifyUser);
module.exports = userRouter;
