const models = require("../models");

const eventsController = {};

//Create an event
eventsController.create = async (req, res) => {
  try {
    //get the id of the loggedin user
    const loggedInUser = await models.user.findOne({
      id: req.headers.authorization,
    });
    console.log(loggedInUser, " loggedInUser");
    const newEvent = await models.event.create({
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      date: req.body.date,
      type: req.body.type,
      details: req.body.details,
      userId: loggedInUser.dataValues.id,
    });

    console.log(newEvent), res.json({ newEvent });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

//Get all the available events
eventsController.getAllEvents = async (req, res) => {
  try {
    const allevents = await models.event.findAll();
    console.log(allevents);
    res.json({ allevents });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

//naming is wrong here
//Get all the events that one user creates
// eventsController.getSavedEvents = async (req, res) => {
//   try {
//     const loggedInUser = await models.user.findOne({
//       id: req.headers.authorization,
//     });
//     const userSavedEvents = await loggedInUser.getEvents();
//     console.log(userSavedEvents);
//     res.json({ userSavedEvents });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: err });
//   }
// };

//Save an even an user likes/saves
eventsController.saveEvent = async (req, res) => {
  try {
    const loggedInUser = await models.user.findOne({
      id: req.headers.authorization,
    });
    const event = await models.event.findOne({
      where: {
        id: req.params.id,
      },
    });
    // console.log("=========", event, "==========");
    const saveEvent = await models.saved_event.create({
      userId: loggedInUser.dataValues.id,
      eventId: event.dataValues.id,
    });
    console.log(saveEvent);
    res.json({ saveEvent });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

//Bring back what a user saved
eventsController.getAllSavedEvents = async (req, res) => {
  try {
    const loggedInUser = await models.user.findOne({
      id: req.headers.authorization,
    });
    const getEvents = await loggedInUser.getEvents();
    console.log(getEvents);
    res.json({ getEvents });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = eventsController;
