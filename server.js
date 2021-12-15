// Require statements.
const express = require("express");
const rowdy = require("rowdy-logger");
const cors = require("cors");
const env = require("dotenv");
const userRouter = require("./routers/userRouter");
const eventsRouter = require("./routers/eventsRouter");
const req = require("express/lib/request");

// App initialization.
const app = express();
const routesReport = rowdy.begin(app);

app.use(express.json());
app.use(cors());
env.config();

// Set port for the app to listen on.
const PORT = process.env.PORT || 3001;

// Set the app to listen.
app.listen(PORT, function () {
  console.log(`Listenting on port ${PORT}`);
  routesReport.print();
});

app.use("/user", userRouter);
app.use("/events", eventsRouter);
