const express = require("express"),
  router = express.Router(),
  moment = require("moment");

const TimeModel = require("../models/timeData.js");

router.get("/", (req, res, next) => {
  res.send("Welcome to my API").status(200);
});

// Create
// router.post("/post/add", async (req, res) => {
//   const { title, author_id, content } = req.body;
//   const response = await PostModel.addEntry(title, author_id, content);
//   if (response.command === "INSERT" && response.rowCount >= 1) {
//     res.sendStatus(200);
//   } else {
//     res.send(`Could not add new blog post ${title}`).status(409);
//   }
// });

// Read All
router.get("/all", async (req, res) => {
  const allTime = await TimeModel.getAll();
  res.json(allTime).status(200);
});

// Read Time
router.get("/:ee_id?", async (req, res) => {
  const eeId = req.params.ee_id;
  const theTime = await TimeModel.getById(eeId);
  res.json(theTime).status(200);
});

// Read Time
router.get("/periods/:ee_id?", async (req, res) => {
  const eeId = req.params.ee_id;
  const thePeriods = await TimeModel.getPeriods(eeId);
  res.json(thePeriods).status(200);
});

// Read Years from calendar
router.get("/years/:ee_id?", async (req, res) => {
  const eeId = req.params.ee_id;
  const theYears = await TimeModel.getYears(eeId);
  res.json(theYears).status(200);
});

// Clock out
router.put("/clockout/:ee_id?", async (req, res) => {
  const eeId = req.params.ee_id;
  endtime = moment().format("YYYY-M-D  H:m")
  console.log("this is the endtime", endtime);
  const time_InstanceOut = new TimeModel(null, null, null, endtime, null);
  const timeOut = await time_InstanceOut.addEndTime(eeId);
  const hoursData = await TimeModel.addHours(eeId);
  if (timeOut.rowCount >= 1) {
    res.sendStatus(200);
  } else {
    res.send(`Could not update ${eeId}`).status(409);
  }
});

//Clock in
router.post("/clockin/:ee_id", async (req, res) => {
  const eeId = req.params.ee_id;
  starttime = moment().format("YYYY-M-D  H:m")
  const time_Instance = new TimeModel(null, null, starttime, null, null);
  const timeIn = await time_Instance.addStartTime(eeId);
  console.log('clockin route was called')
  console.log('timein:', timeIn)

  if (timeIn.rowCount === 1) {
    res.status(200).json(timeIn);
  } else {
    res.send(`Could not update ${eeId}`).status(409);
  }
});

router.post("/add_timeOut", async (req, res) => {
  let { endtime } = req.body;
  console.log("this is the endtime", endtime);
  endtime = moment().format("YYYY-M-D  H:m")
  const time_InstanceOut = new timeModel(null, null, null, endtime, null);
  const timeOut = await time_InstanceOut.addEndTime(req.session.t_id);
  const hoursData = await timeModel.addHours(req.session.t_id);

  if (timeOut.rowCount !== 1) {
    res.sendStatus(500);
  } else {
    res.redirect("/timesheet/timesheet");
  }
});
// // Delete
// router.delete("/post/delete/:post_id?", async (req, res) => {
//   const postId = req.params.post_id;
//   const response = await PostModel.removeEntry(postId);

//   if (response.command === "DELETE" && response.rowCount >= 1) {
//     res.sendStatus(200);
//   } else {
//     res.send(`Could not delete Post ID ${postId}`).status(409);
//   }
// });



module.exports = router;
