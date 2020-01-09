const axios = require("axios");
const express = require("express");
const Promise = require('bluebird');

var router = express.Router();
const PAGE_FAQ_MAX = 50;

router.get("/", async function(req, res) {
    axios	
    .get(`https://jsracs.libanswers.com/1.0/topics?iid=2028`)
    .then(response => {
    	let topics = response.data;
    	let data = {
			status: "success",
			payload: topics
		}
		res.json(data);
    })
    .catch(error => console.log(error));	  
});

//Singular Topic 
router.get("/:id", async function(req, res) {
	axios
    .get(`https://jsracs.libanswers.com/api/1.0/topics/${req.params.id}?iid=2028`)
    .then(response => {
    	let topic = response.data;
    	let data = {
			status: "success",
			payload: topic
		}
		res.json(data);
    })
    .catch(error => console.log(error));	
});

router.post("/", function(req, res){
	let data = {status: "success"}
	res.json(data);
});

router.put("/", function(req, res){
	let data = {status: "success"}
	res.json(data);
});

router.delete("/", function(req, res){
	let data = {status: "success"}
	res.json(data);
});

module.exports = router