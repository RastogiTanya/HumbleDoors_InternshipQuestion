const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const UserModel = require("../models/User");
const TopicModel = require("../models/Topic");
const middleware = require("../middleware/auth");
const dotenv = require("dotenv");

dotenv.config();

const addTopic = async (req, res) => {
	//addTopic api logic here
	//if any errors
	try {
		console.log("hhh");
		console.log(req.userData._id);
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				error: errors.array()[0],
			});
		}
		let topic = await TopicModel.create({
			name: req.body.name,
			description: req.body.description,
		});

		console.log(topic);
		if (topic) {
			await UserModel.findOneAndUpdate(
				{ _id: req.userData._id },
				{ $push: { topics: topic._id } }
			);
			return res.json({
				result: true,
				id: topic._id,
			});
		} else {
			return res.json({
				result: false,
				message: "Error Occured",
			});
		}
	} catch (error) {
		console.log(error);
	}
};

const getTopic = async (req, res) => {
	try {
		let topic = await TopicModel.findById(req.params.id);
		console.log(topic);
		if (topic) {
			return res.status(201).send({
				result: true,
				topic,
			});
		} else {
			return res.json({
				result: false,
				message: "No record found",
			});
		}
	} catch (error) {
		// console.log(error);
		return res.json({
			result: false,
			message: "Something went wrong",
		});
	}
};

const deleteTopic = async (req, res) => {
	try {
		let delete_topic_list = await TopicModel.deleteOne({
			_id: req.body.topic_id,
		});
		if (!delete_topic_list) {
			return res.json({
				result: false,
				message: "topic id not found",
			});
		}
		let delete_topic_users = await UserModel.findOneAndUpdate(
			{ _id: req.userData._id },
			{ $pull: { topic_ids: req.body.topic_id } }
		);

		if (!delete_topic_users) {
			return res.json({
				result: false,
				message: "user not found",
			});
		}
		if (delete_topic_list && delete_topic_users) {
			return res.json({
				result: true,
			});
		}
	} catch (error) {
		console.log(error);
	}
};

const PostController = {
	addTopic,
	getTopic,
	deleteTopic,
};

module.exports = PostController;
