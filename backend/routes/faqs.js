const axios = require("axios");
const express = require("express");
const Promise = require('bluebird');
const { promisify } = require('util');
const moment = require('moment');

var router = express.Router();
const PAGE_FAQ_MAX = 50;
const REFRESH_TIMEOUT = 999999 * 60 * 1000
	
//Sort is (faqid, question, updated, created, totalhits)
//Order is (asc, desc)
//Limit is items per page (Max: 50)
//Page is the page number (Items divided across as many pages per the limit with remainder on the last)
const getLibAnswers = async () => {
    let results = []
    let concurrentPages = 3
    let page = 1

    while(true) {
        try {
            console.log(Array(concurrentPages).fill(page).map((o, i) => o + i))
            await Promise.map(Array(concurrentPages).fill(page).map((o, i) => o + i), async (page) => {
                let resp = await axios.get(`https://jsracs.libanswers.com/1.0/faqs?iid=2028&sort=updated&sort_dir=desc&limit=${PAGE_FAQ_MAX}&page=${page}`)
                results = results.concat(resp.data.faqs)
                return 
            })
        } catch (err) {
            console.log(err)
            break;
        }
        if (results.length < PAGE_FAQ_MAX * concurrentPages) {
            break;
        }
        page += concurrentPages;
    }

    return results
}

const getAllFaqs = async ({ rc, asDict }) => {
    const getRedisHKeys = promisify(rc.hgetall).bind(rc);
    const setRedisHKey = promisify(rc.hset).bind(rc);

    let returnDict = asDict === true
    let results = []
    let redisCache
    try {
        redisCache = await getRedisHKeys("faqs");
    } catch (e) {
        console.log(e)
    }

    const getNew = async (returnDict) => {
        results = await getLibAnswers(returnDict)
        await Promise.map(results, async (result) => {
            await setRedisHKey("faqs", result.faqid, JSON.stringify(result))
        })
        console.log(moment().toString())
        await setRedisHKey("faqs", "timestamp", moment().valueOf().toString())

        if (returnDict) {
            let dictResults = {}
            results.map(faq => {
                dictResults[faq.faqid] = faq
            })
            return dictResults
        }

        return results
    }

    if (redisCache && Object.keys(redisCache).length > 0) {
        console.log(moment().diff(parseInt(redisCache["timestamp"])))
        if (moment().diff(parseInt(redisCache["timestamp"])) < REFRESH_TIMEOUT) {
            if (returnDict) {
                Object.keys(redisCache).map((key) => {
                    if (key !== "timestamp") {
                        redisCache[key] = JSON.parse(redisCache[key])
                    }
                }, [])

                results = redisCache
            } else {
                results = Object.keys(redisCache).reduce((arr, key) => {
                    if (key !== "timestamp") {
                        arr.push(JSON.parse(redisCache[key]))
                    }
                    return arr
                }, [])
            }
        } else {
            results = await getNew(returnDict)
        }
    } else {
        results = await getNew(returnDict)
    }

    return results
}

router.get("/", async function(req, res) {
    let body = req.body
    const rc = req.redis.client
    
    let results = await getAllFaqs({rc})

    let data = {
    	status: "success",
    	payload: results
    }
	res.json(data);  
});

//Singular FAQ 
router.get("/:id", async function(req, res) {
    let params = req.params
    let { id } = params
    const rc = req.redis.client

    let results = await getAllFaqs({rc, asDict: true})

	let faq = results[id.toString()]

    if (faq) {
        res.status(200)
        return res.json({
            status: "success",
            payload: faq
        });
    } else {
        res.status(400)
        return res.json({
            status: "error",
            message: "not found"
        });
    }
    
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