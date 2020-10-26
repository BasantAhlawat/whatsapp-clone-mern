import React, {useState, useEffect} from 'react';
import "./Sidebar.css";
import ChatIcon from '@material-ui/icons/Chat';
import {Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from "./SidebarChat.js";
import db from './firebase';


function Sidebar() {

    const [rooms,setRoom] = useState([]);

    useEffect( () => {
        // snapshot function to make firebase real time
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot) =>{
            // console.log("the snapshot is: ",snapshot);
            setRoom(
                snapshot.docs.map((doc) =>({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        })

        return () => {
            unsubscribe();
        }

    },[])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__avatarLeft">
                    <Avatar src='https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg' />
                </div>
                <div className="sidebar__headerRight">
                    
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchIcon className="sidebar__searchContainer__searchIcon" />
                    <input className="sidebar__searchContainer__searchBar" placeholder="Type text to search" type="text"></input>

                </div>
                
            </div>
            <div className="sidebar__chat">
                <SidebarChat addNewChat="true" />
                {rooms.map((room) =>(
                    <SidebarChat
                        addNewChat="false"
                        key= {room.id}
                        id = {room.id}
                        name = {room.data.name}
                    />
                )
                )}
            </div>
        </div>
    )
}

export default Sidebar
