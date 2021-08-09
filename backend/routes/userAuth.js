const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');



router.post('/signup',(req,res)=>{
    const {
        username,
        password,} = req.body;
    if(!username || !password ){
        return res.status(400).json({error:"all fileds are required"})
    }
    User.findOne({username:req.body.username}).then((user) => {
        if(user){
            return res.status(400).json({error:"user already exists"})
        }
        bcrypt.hash(password,10).then(hashedpassword=>{
            const _user = new User({
                username,
                password:hashedpassword,
                });
            _user.save().then(data=>{
                return res.status(200).json({message:"sucessfully registered",data})
            }).catch(err=>{
                return res.status(401).json({error:err.message})
            })

        })
    }).catch((err) =>{return res.status(401).json(err.message)})
})


router.post('/login',(req,res)=>{
    const {username,password} = req.body
    if(!username|| !password){
        return res.status(422).json({error:"please enter a valid email or password"})
    }
    User.findOne({username:username}).then((user)=>{
        if(!user){
            return res.status(422).json({message:"invalid email or password"})
        }
        bcrypt.compare(password,user.password).then(doMatch=>{
            if(doMatch){
                // return res.status(200).json({message:"sucessfully logged in "})
                const token = jwt.sign({_id: user.id,},"secret",{expiresIn:'1h'});
                const {_id,username} = user;
                res.json({token,saveduser:{_id,username}});
            }
            else{
                return res.status(422).json({message:"invalid email or password"})
            }
        })
    }).catch(err=>{
        return res.status(400).json(err.message)
    })
})

module.exports = router