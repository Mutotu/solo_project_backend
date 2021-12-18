// const eventsRouter = require("express").Router();
// const {
//   saveEvent,
//   getAllSavedEvents,
// } = require("../controllers/eventsController");
// const eventsController = require("../controllers/eventsController");

// eventsRouter.post("/create", eventsController.create);
// eventsRouter.get("/getall", eventsController.getAllEvents);

// ///this one brings what user creates
// // eventsRouter.get("/getSavedAll", eventsController.getSavedEvents);
// /////
// //this one doesnt work with eventscontroller
// eventsRouter.post("/save/:id", saveEvent);

// //this one without eventscontroller worked
// // eventsRouter.get("/getsaves", getAllSavedEvents);
// eventsRouter.get("/getsaves", eventsController.getAllSavedEvents);
// //delete an event
// eventsRouter.delete("/delete/:id", eventsController.deleteEvent);
// module.exports = eventsRouter;

////////////////////////////////////////////////////////////////
const eventsRouter = require("express").Router();
const auth = require("../controllers/middleware/verify");
const {
  saveEvent,
  getAllSavedEvents,
} = require("../controllers/eventsController");
const eventsController = require("../controllers/eventsController");
const { verify } = require("../controllers/middleware/verify");

eventsRouter.post("/create", [auth.verify], eventsController.create);
eventsRouter.get("/getall", [auth.verify], eventsController.getAllEvents);

eventsRouter.post("/save/:id", [auth.verify], saveEvent);

eventsRouter.get(
  "/getsaves",
  [auth.verify],
  eventsController.getAllSavedEvents
);
//delete an event
eventsRouter.delete("/delete/:id", [auth.verify], eventsController.deleteEvent);

eventsRouter.get("/getUserEvents", eventsController.userCreatedEvent);
eventsRouter.put("/attendee/:id", eventsController.counterAttendees);
module.exports = eventsRouter;
