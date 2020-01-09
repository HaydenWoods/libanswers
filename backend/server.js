const express = require("express");
const bodyParser = require('body-parser');
const redis = require("redis");

const indexRoute = require("./routes/index.js");
const faqsRoute = require("./routes/faqs.js");
const topicsRoute = require("./routes/topics.js");

const PORT = 3001;

const app = express();
const client = redis.createClient('redis://redis:6379');

const redisMiddleware = (req, res, next) => {
	req.redis = {
		client: client
	}
	return next()
}

client.on("error", function (err) {
  console.log("Error", err);
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
 
    next();
});

app.use(bodyParser.json());

app.use("/api", redisMiddleware, indexRoute);
app.use("/api/faqs", redisMiddleware, faqsRoute);
app.use("/api/topics", redisMiddleware, topicsRoute);

app.listen(PORT, "0.0.0.0");