import { Avatar, IconButton } from '@material-ui/core';
import React,{useState, useEffect} from 'react';
import "./Chatbox.css";
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from "./Axios";
import { useParams } from 'react-router-dom';
import db from './firebase';




function Chatbox({messages}) {

    const [input,setInput] = useState("");
    // dynamic change in roodId, using usePram hook
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState("Basant");

    useEffect(() => {
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot((snapshot) =>
                setRoomName(snapshot.data().name)
            );
        }
    }, [roomId])


    const sendMessage = async (e)=> {
        e.preventDefault();
        const time=new Date().toLocaleTimeString();

        await axios.post("/messages/new", {
            name: "Basant",
            message: input,
            timestamp: time,
            received: false
        });

        setInput("");

    };

    const random=Math.floor(Math.random()*200);


    return (


        <div className="chatbox">
            <div className="chatbox__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${random}.svg`} />
                <div className="chatbox__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last Seen ...</p>
                </div>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <IconButton>
                    <AttachFileIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
            <div className="chatbox__body">
                {messages.map( (message)=>(
                    <div className={`chatbox__message ${(!message.received) && "chatbox__reciever" }`}>
                        <p>
                            <span className="chatbox__messageName">{message.name}</span>
                            {message.message}
                            <span className="chatbox__messageTime">{message.timestamp}</span>
                        </p>     
                    </div>
                ))}
                
            </div>
            <div className="chatbox__footer">
                <InsertEmoticonIcon />
                <form >
                    <input placeholder='Type a message' value={input} onChange={ (e)=> setInput(e.target.value)} type="text" />
                    <button onClick={sendMessage}  type="submit" >Send a message</button>
                </form>
                <MicIcon />
            </div>
            
        </div>
    )
}

export default Chatbox
