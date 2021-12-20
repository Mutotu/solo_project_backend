const models = require("../models");

const userController = {};

userController.create = async (req, res) => {
  try {
    const newUser = await models.user.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      bike_type: req.body.bike_type,
    });
    console.log(newUser);
    res.json({ newUser });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

// userController.findUser = async (req, res) => {
//   try {
//     const foundUser = await models.user.findOne({
//       where: {
//         email: req.body.email,
//         password: req.body.password,
//       },
//     });
//     console.log(foundUser);
//     res.json({ foundUser });
//   } catch (err) {
//     res.status(400).json({ message: err });
//   }
// };

userController.findUser = async (req, res) => {
  try {
    const foundUser = await models.user.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (foundUser.password === req.body.password) {
      res.json({ foundUser });
    } else {
      res.json("user not found");
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

userController.deleteUser = async (req, res) => {
  try {
    const deleteAccount = await models.user.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log(deleteAccount);

    res.json({ message: "user deleted" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

userController.updateBike = async (req, res) => {
  console.log("========", req.headers.bike_type);
  try {
    const loggedInUser = await models.user.findOne({
      where: { id: req.headers.authorization },
      // where: { id: req.params.id },
    });
    const updating = await loggedInUser.update({
      bike_type: req.headers.bike_type,
    });

    console.log(updating);
    res.json({ updating });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

userController.verifyUser = async (req, res) => {
  try {
    const verfiedUser = await models.user.findOne({
      where: { id: req.headers.authorization },
    });
    console.log(verfiedUser);
    // if (verfiedUser && verfiedUser.password === req.body.password) {
    if (verfiedUser) {
      res.json({ verfiedUser });
    } else {
      console.log("not matched");
    }
  } catch (err) {
    console.log(err);
  }
};

userController.getUserInfo = async (req, res) => {
  try {
    const getUser = await models.user.findOne({
      where: { id: req.params.id },
    });
    console.log(getUser);
    res.json({ getUser });
  } catch (err) {
    console.log(err);
  }
};

module.exports = userController;
