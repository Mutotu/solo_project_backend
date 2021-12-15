const eventsRouter = require("express").Router();
const {
  saveEvent,
  getAllSavedEvents,
} = require("../controllers/eventsController");
const eventsController = require("../controllers/eventsController");

eventsRouter.post("/create", eventsController.create);
eventsRouter.get("/getall", eventsController.getAllEvents);

///this one brings what user creates
// eventsRouter.get("/getSavedAll", eventsController.getSavedEvents);
eventsRouter.post("/save/:id", saveEvent);
eventsRouter.get("/getsaves", getAllSavedEvents);
module.exports = eventsRouter;
