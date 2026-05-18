const express = require("express");
const router = express.Router();


//POST
//index route
router.get("/", (req,res)=>{
    res.send("GET for posts");
});
//show route
router.get("/:id", (req,res)=>{
    res.send("GET for post id");
});

//POST-users
router.post("/", (req,res)=>{
    res.send("POST for posts");
});

//DELETE=route
router.delete("/:id",(req,res)=>{
    res.send("DELETE foe users id");
});

module.exports = router;