import express from "express";
import mongoose from "mongoose";
import Messages from "./DbMessages.js";
import Pusher from "pusher";
import cors from "cors";

//app config
const app=express();
const port= process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

const pusher = new Pusher({
  appId: '1095708',
  key: '59b48d67f4c1559ff210',
  secret: 'a5dbbce3a19296819d67',
  cluster: 'ap2',
  encrypted: true
});

//DB config
const connectionURL = 'mongodb+srv://admin:tq5tio4Rh4uW8DyA@cluster0.0urwi.mongodb.net/whatsappDB?retryWrites=true&w=majority';
mongoose.connect(connectionURL,{
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology:true
});


const db= mongoose.connection;
db.once("open", () => {
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream =   msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log("A change occured", change);

        if(change.operationType === "insert"){
            const messageDetails = change.fullDocument;
            // here messages is the channel on to which the event takes place, and inserted is the event
            pusher.trigger("messages","inserted",{
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            });
        } else{
            console.log("Error triggering Pusher");
        }

    });


});


// api routes
app.get("/",(req,res) => res.status(200).send("Your backend is running"));

// get the data from db
app.get("/messages/sync",(req,res) =>{
    Messages.find((err,data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });
});


// post new message to DB
app.post("/messages/new", (req,res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage,(err,data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });

})

app.listen((port), () => console.log('App running successfully on port:'+port));


// https://whatsapp-mern-1.herokuapp.com/messages/sync