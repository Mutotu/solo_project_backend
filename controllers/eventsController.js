const models = require("../models");

const eventsController = {};

//Create an event
eventsController.create = async (req, res) => {
  console.log(req.headers);
  try {
    //get the id of the loggedin user
    const loggedInUser = await models.user.findOne({
      where: { id: req.headers.authorization },
    });
    // console.log(loggedInUser, " loggedInUser");
    const newEvent = await models.event.create({
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      date: req.body.date,
      type: req.body.type,
      details: req.body.details,
      userId: loggedInUser.dataValues.id,
    });

    console.log(newEvent);
    res.json({ newEvent });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

//Get all the available events
eventsController.getAllEvents = async (req, res) => {
  try {
    const allevents = await models.event.findAll();
    // console.log(allevents);
    res.json({ allevents });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

//Get all the events that one user creates
eventsController.userCreatedEvent = async (req, res) => {
  try {
    const loggedInUser = await models.user.findOne({
      where: { id: req.headers.authorization },
    });
    // console.log(loggedInUser, "==========");
    // const userSavedEvents = [];
    const events = await models.event.findAll({
      where: { userId: loggedInUser.dataValues.id },
    });
    // console.log(events);
    res.json({ events });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

//Save an even an user likes/saves
eventsController.saveEvent = async (req, res) => {
  console.log(req.body);
  try {
    ////
    //// it keeps finding userid 1 /// fixed it by add where clause in findOne() lol
    ////
    const loggedInUser = await models.user.findOne({
      where: { id: req.headers.authorization },
    });
    // console.log("========", loggedInUser, "===============================");
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
      where: { id: req.headers.authorization },
    });
    // console.log("===loggedinuser", loggedInUser.dataValues.id);

    // const getEvents = await loggedInUser.dataValues.id.getEvents();
    // const getEvents = await loggedInUser.getEvents();

    const getEventsIds = await models.saved_event.findAll({
      where: { userId: loggedInUser.dataValues.id },
    });
    ///get the eventids and store them
    const eventsIds = [];
    for (let i of getEventsIds) {
      eventsIds.push(i.dataValues.eventId);
    }
    //get the events and save them to do res.json()
    const savedEvents = [];
    for (let i of eventsIds) {
      const findEvent = await models.event.findOne({
        where: { id: i },
      });
      savedEvents.push(findEvent);
    }

    // console.log(savedEvents);
    res.json({ savedEvents });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

//Delete an event
//get eventid
//get the userid
eventsController.deleteEvent = async (req, res) => {
  try {
    const loggedInUser = await models.user.findOne({
      where: { id: req.headers.authorization },
    });
    const deleteEvent = await models.saved_event.destroy({
      where: { userId: loggedInUser.dataValues.id, eventId: req.params.id },
    });
    // console.log(deleteEvent);
    res.json({ deleteEvent });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

/////errorr not seeing the newly added coulumn
///get the number of people attending
eventsController.counterAttendees = async (req, res) => {
  console.log(req.params.id);

  try {
    const event = await models.event.findOne({
      where: {
        id: req.params.id,
      },
    });
    //cant see the column name attendee
    const attendee = event.dataValues;
    console.log(event);
    console.log(attendee);
    res.json({ attendee });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

module.exports = eventsController;
