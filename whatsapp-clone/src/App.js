// link: https://whatsapp-clone-70ebe.web.app/rooms/68lfXwufYErCmiwLawCZ

import React, { useEffect, useState} from 'react';
import Sidebar from "./Sidebar";
import Chatbox from "./Chatbox";
import "./App.css"
import Pusher from "pusher-js"
import axios from "./Axios"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  const [messages,setMessages] = useState([]);

    // initially messages set to current messages on db
  useEffect(() => {
    
    axios.get('/messages/sync')
      .then( response =>{
        console.log(response.data);
        setMessages(response.data);
      })
  }, [])


  // updation of messages whenever the is a new message on db, using pusher
 useEffect( () => {
    
    const pusher = new Pusher('59b48d67f4c1559ff210', {
      cluster: 'ap2'
    });

    // messages is the channel where our db is hosted
    const channel = pusher.subscribe('messages');
    // inserted is the operation done
    channel.bind('inserted', function(newMessage) {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }


}, [messages]);

console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Chatbox messages={messages} />      
            </Route>
            <Route path="/">
              <Chatbox messages={messages} />      
            </Route>
          </Switch>
        </Router>
        
      </div>
      
    </div>
  );
}

export default App;
