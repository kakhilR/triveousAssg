const express = require('express');
const router = express.Router();
const Text = require('../models/text.js');


router.get('/text',(req, res)=>{ 
    Text.find({})
    .then((data)=>{
        console.log(data)
        res.json({data: data});
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = router
