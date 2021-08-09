const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user.js');
const Text = require('./models/text.js');


const Port = 8080;
app.use(cors())
app.use(express.json());
mongoose.connect(process.env.MongoURI,
    {   useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology: true}).then(()=>console.log('database connected'))
                                  .catch((err)=>console.log(err))



app.get('/api',(req,res)=>{
    res.send('hello')
})



const userRouter = require('./routes/userAuth.js');
const userText = require('./routes/text.js')

app.use('/api',userRouter)
app.use('/api',userText)

const server = app.listen(Port,()=>{console.log('listening on 8080')})

const jwt = require('jsonwebtoken');



const io = require('socket.io')(server,{cors: {
    origin: "http://localhost:3000",
    credentials: true
  }}
  );

io.use(async (socket,next)=>{
    try{
        const token = socket.handshake.query.token;
        jwt.verify(token,"secret",(err,payload)=>{
            if(err){
                return json({message:"you must login first"})
            }else{
                const  {_id}= payload
                User.findById(_id).then(userdata=>{
                socket.userId = userdata._id
                next()
            })}
            
        })
        }
        catch(err){
            console.log(err);
        }
})


io.on('connection',(socket)=>{
    console.log("socket connected "+socket.userId)
    
    socket.on('text',({contentState,username})=>{
        console.log(contentState,username)
        if(contentState.text !== ''){
            const saveId = new Text({
                user:socket.userId,
                data:[contentState,username]
            })
            saveId.save().then(data=>{
                return json({message:"sucessfully registered",data})
            }).catch(err=>{
                return status(401).json({error:err.message})
            })
        }
        
    })
    

    socket.on("disconnect",()=>{
        console.log("disconnected")
    })
})