const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const app = express()
const port = 3000
const cors = require('cors')
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const jwt = require("jsonwebtoken")

mongoose.connect("",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Connected to MongoDB")
}).catch((err)=>{
    console.log("Error Connecting to MongoDB")
})

app.listen(port,()=>{
    console.log("server is running on port 3000")
})

const User = require("./models/user")
const Post = require("./models/post")

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

//endpoint to rego
app.get("/register", async(req,res) => {
    console.log("여기까지 옴??")
    try{
        const {name,email,password} = req.body
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"Email already has taken"})
        }

        //create a new user
        const newUser = new User({name,email,password})
        //gen and store the varifi token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex")
        //save the user to the database
        await newUser.save()

        //send the varification email to user
        sendVerificationEmail(newUser.email, newUser.verificationToken)

        res.status(200).json({message:"rego new user successfully, please check your email for verification"})
    } catch(error){
        console.log("Error rego user", error)
        res.status(500).json({message:"error rego user"})
    }
})

const sendVerificationEmail = async(email,verificationToken) => {
    //create a nodemailer
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"",
            pass:""
        }
    })

    //compose the email message
    const mailOptions = {
        from:"gigibike.com",
        to:email,
        subject:"Email Verification",
        text:`이메일 인증을 위하여 클릭해 주세요 http://localhost:3000/verify/${verificationToken}}`
    }

    try{
        await transporter.sendMail(mailOptions)
    }catch(error){
        console.log("error sending email",error)
    }
}

app.get("verify/:token",async(req,res) => {
    try{
        const token = req.params.token

        const user = await User.findOne({verificationToken:token})
        if(!user){
            return res.status(404).json({message:"Invalid token"})
        }

        user.verified = true
        user.verificationToken = undefined
        await user.save()

        res.status(200).json({message:"Email verified successfully"})
    }catch(error){
        console.log("error getting token", error)
        res.status(500).json({message:"Email verification failed"})
    }
})

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex")
    return secretKey
}

const secretKey = generateSecretKey()

app.post("/login",async(req,res) => {
    try{
        const {email,password} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"Invalid email"})
        }

        if(user.password !== password){
            return res.status(404).json({message:"Invalid password"})
        }

        const token = jwt.sign({userId:user._id},secretKey)

        res.status(200).json({token})
    }catch(error){
        res.status(500).json({message:"Login failed"})
    }
})