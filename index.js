const express = require('express');
const app = express();
const mongoose= require('mongoose');
const dotenv = require('dotenv');
//import router
const authRoute = require('./route/auth')
const postRoute = require('./route/post')

dotenv.config()
// db
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true, useUnifiedTopology: true }, ()=>console.log("DB Connected"))

app.use(express.json())
// router middleware     
app.use('/api/user',authRoute)
app.use('/api/posts', postRoute);

app.listen(3000, ()=>console.log("Server running at port 3000"))