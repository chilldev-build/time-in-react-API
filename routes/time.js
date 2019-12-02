var express = require("express");
var router = express.Router();

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

// // Update
// router.put("/post/update/:post_id?", async (req, res) => {
//   const postId = req.params.post_id;
//   const { content } = req.body;
//   const response = await PostModel.updateEntry(postId, "content", content);
//   if (response.command === "UPDATE" && response.rowCount >= 1) {
//     res.sendStatus(200);
//   } else {
//     res.send(`Could not update Post ID ${postId}`).status(409);
//   }
// });

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
