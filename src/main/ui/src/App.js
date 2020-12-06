import React, {useState} from 'react';
import './App.css';
import Login from "./Login";
import Input from "./input";
import SockJsClient from "react-stomp";
import api from "./api";
import stomp from "@stomp/stompjs"

const App = () => {
    // const [messages, setMessages] = useState([])
    const [user, setUser] = useState(null)

    let onConnected = () => {
        console.log("Connected!!")
        var socket = new SockJS('/sock');
        var stompClient = stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
        enterRoom(1);
    }

    let onMessageReceived = (msg) => {
        console.log('New Message Received!!', msg);
    }

    let onSendMessage = (msgText) => {
        console.log(msgText);
        api.send(user.username, msgText);
    }

    let handleLoginSubmit = (username) => {
        console.log(username, " Logged in..");
        let color = "#"+((1<<24)*Math.random()|0).toString(16)

        console.log(username, color);
        setUser({
            username: username,
            color: color
        })

    }

    function enterRoom(newRoomId) {
        let roomId = newRoomId;
        let topic = `/chat-app/chat/${newRoomId}`;

        var currentSubscription = this.stomp.subscribe(`/chat-room/1`, onMessageReceived);
        this.stomp.send(`${topic}/addUser`,
            {},
            JSON.stringify({sender: user.username, type: 'JOIN'})
        );
    }

    let onMessageReceive = (msg, topic) => {
        this.setState(prevState => ({
            messages: [...prevState.messages, msg]
        }));
    }

    return (
        <div className="App">

        {!!user ?
              (
                  <>
                  <SockJsClient url='http://localhost:8080/sock'
                                topics={["/chat/1/addUser"]}
                                onMessage={msg => onMessageReceive(msg)}
                                onConnect={onConnected}
                                onDisconnect={console.log("Disconnected!")}
                                debug={true}
                  />
                  <Input onSendMessage={onSendMessage} />
                  </>
              ) :
              <Login onSubmit={handleLoginSubmit}/>
        }
        </div>
    )
}

export default App;