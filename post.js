const router = require('express').Router();
const auth = require("./verifyToken")
const User = require('../model/User')

router.get('/',auth, async (req, res)=>{
    const id = req.user._id

    const newUserr =await User.findOne({_id: id});
    res.send(newUserr.name)
    
})

module.exports= router