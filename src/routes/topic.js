const express = require("express");
const router = express.Router();
const TopicController = require("../controllers/topic.controller");
const validator = require("../validator/auth");
const middleware = require("../middleware/auth");
// Create routes for user here

router.post("/create", middleware.verifyUser, TopicController.addTopic);
router.get("/get/:topicId", middleware.verifyUser, TopicController.getTopic);
router.post("/delete", middleware.verifyUser, TopicController.deleteTopic);

module.exports = router;
