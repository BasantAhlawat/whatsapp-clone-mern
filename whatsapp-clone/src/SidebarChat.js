import { Avatar } from '@material-ui/core'
import React from 'react'
import "./SidebarChat.css" 
import db from "./firebase"
import {Link} from "react-router-dom"

function SidebarChat({addNewChat,id,name}) {

    const createRoom = () =>{
        const roomName= prompt("Enter the name of room");

        if(roomName){
            db.collection("rooms").add({
                name: roomName,
            });
        }

    }

    const random=Math.floor(Math.random()*5000);


    return !(addNewChat==="true")?
        (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${random}absd1243.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>The last message</p>
                </div>
            </div>
        </Link>)
        :
        (
            <div onClick={createRoom} className="sidebarChat">
                <h2>Add New Chat</h2>
            </div>
        )
}

export default SidebarChat
