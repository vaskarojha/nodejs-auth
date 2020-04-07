const router = require('express').Router();
const User = require('../model/User')
const {registerValidation, loginValidation} = require("../validation");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req,res)=>{
    // console.log(req.body.name)
    // checking validation

    const {error} = registerValidation(req.body)

    if(error) {
        console.log(error)
        return res.status(400).send(error.details[0].message)
    }
    // checking email exist or not
    const emailExist =await User.findOne({email: req.body.email});
    if(emailExist){
      return  res.status(400).send('Email already exists');
    }
    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)


    const user = new User({
        name : req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try{      
        const savedUser =await user.save();
        res.send(savedUser)
    } catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/login', async (req, res)=>{
    const {error} = loginValidation(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email doesont exits');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400). send("Password doesnot matched")

    // creating a individual user token
    const token = jwt.sign({_id: user.id}, process.env.SECRET_KEY);
    res.header("auth-token", token).send( token)

    // res.send("Login successful")

})

module.exports= router;