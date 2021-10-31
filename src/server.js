const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const http = require("http");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.setHeader(
// 		"Access-Control-Allow-Headers",
// 		"Origin,X-Requested-With,Content-Type,Accept,Authorization"
// 	);
// 	res.setHeader(
// 		"Access-Control-Allow-Methods",
// 		"GET,POST,PATCH,DELETE,PUT,OPTIONS"
// 	);
// 	//  res.setHeader("Content-Type","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
// 	if (req.method === "OPTIONS") {
// 		res.sendStatus(200);
// 	} else {
// 		next();
// 	}
// });

// const modelsPath = "./";
//const routesPath = require("./routes");

// fs.readdirSync(modelsPath).forEach(function (file) {
// 	if (~file.indexOf(".js")) require(modelsPath + "/" + file);
// });

// fs.readdirSync(routesPath).forEach(function (file) {
// 	if (~file.indexOf(".js")) {
// 		let route = require(routesPath + "/" + file);
// 		route.setRouter(app);
// 	}
// });

const loginRouter = require("./routes/auth.js");
app.use("/api", loginRouter);
const topicRouter = require("./routes/topic.js");
app.use("/api", topicRouter);

// port at which server listening
const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
server.listen(process.env.PORT || 5000);
server.on("error", onError);
server.on("listening", onListening);

//error
function onError(error) {
	if (error.syscall !== "listen") {
		throw error;
	}
	//console.log(error);
	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			process.exit(1);
			break;
		case "EADDRINUSE":
			process.exit(1);
			break;
		default:
			throw error;
	}
}

//
function onListening() {
	//for add mongodb add %40 instead of @
	var addr = server.address();
	console.log("lll");
	var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
	"Listening on " + bind;
	let db = mongoose.connect(
		process.env.MONGO_URL,

		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			//	useFindAndModify: false,
			//	useCreateIndex: true,
		}
	);
}

// sample for express server
mongoose.connection.on("error", function (err) {
	console.log("database connection error");
	console.log(err);
}); // end mongoose connection error

mongoose.connection.on("open", function (err) {
	if (err) {
		console.log(`database error`);
		console.log(err);
	} else {
		console.log(
			`database connected successfully port no : ${process.env.PORT}`
		);
	}
});
