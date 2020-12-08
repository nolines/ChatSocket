import React, {Component} from 'react';
import './App.css';
import Login from "./Login";
import Input from "./input";
import SockJsClient from "react-stomp";
import Message from "./Message";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            message: "",
            username: null,
            messages: [],
            loginFormInvalid: true
        }
    }

    onConnected = () => {
        console.log("Connected!!")
    }

    onMessageReceived = (msg) => {
        console.log('New Message Received!!', msg);
    }

    onSendMessage = (msgText) => {
        if (this.state.username) {
            this.setState({message: msgText});
            // this.state.messages.push({username: this.state.username, message: msgText});
            this.clientRef.sendMessage("/chat-app/chat/1/sendMessage",
                JSON.stringify({sender: this.state.username, content: msgText, messageType: 'CHAT'}));
            this.setState({message: ''})
        }
    }

    handleLoginSubmit = (username) => {
        console.log(username, " Logged in..");
        this.enterRoom(username, 1);
        this.setState({username:username});
    }

    enterRoom(username , newRoomId) {
        this.clientRef.sendMessage("/chat-app/chat/" + newRoomId + "/addUser",
            JSON.stringify({sender: username, messageType: 'JOIN'}));
        this.setState({loggedIn: true});
        this.setState({username:username})

    }

    onMessageReceive = (msg) => {
        if(msg.type === 'JOIN'){
            this.state.messages.push({username: msg.sender, message: msg.sender + " joined the room!", type:'JOIN', date:msg.date});
        }else if(msg.type === 'LEAVE'){
            this.state.messages.push({username: msg.sender, message: msg.sender + " left the room!", type:'LEAVE', date:msg.date});
        }else if(msg.type === 'CHAT'){
            this.state.messages.push({username: msg.sender, message: msg.content, type:'CHAT', date:msg.date});
        }

        this.setState({messages: this.state.messages})
    }


    render() {

        return (
            <React.Fragment>
                <div style={{border: "1px solid", width: "30%"}}>
                <Message
                    messages={this.state.messages}
                    user={this.state.username}
                    />
                <SockJsClient url='http://localhost:8080/sock'
                              topics={["/chat-room/1"]}
                              onMessage={msg => this.onMessageReceive(msg)}
                              onConnect={this.onConnected}
                              onDisconnect={console.log("Disconnected!")}
                              ref={(client) => {
                                  this.clientRef = client
                              }}
                />
                <Input onSendMessage={this.onSendMessage}/>
                <Login
                    onSubmit={this.handleLoginSubmit}
                />
                </div>
            </React.Fragment>
        )
    }
}

export default App;