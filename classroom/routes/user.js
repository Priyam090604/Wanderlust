const express = require("express");
const router = express.Router();


//index route
router.get("/", (req,res)=>{
    res.send("GET for users");
});
//show route
router.get("/:id", (req,res)=>{
    res.send("GET for show users");
});

//POST-users
router.post("/", (req,res)=>{
    res.send("POST for users");
});

//DELETE=route
router.delete("/:id",(req,res)=>{
    res.send("DELETE foe users id");
});

module.exports = router;
