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
            loginFormInvalid: true,
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
            this.state.messages.push({username: this.state.username, message: msgText});
            this.clientRef.sendMessage("/chat-app/chat/1/sendMessage",
                JSON.stringify({sender: this.state.username, content: msgText, messageType: 'CHAT'}));
            this.setState({message: ''})
        }
    }

    handleLoginSubmit = (username) => {
        console.log(username, " Logged in..");
        this.enterRoom(username, 1);
    }

    enterRoom(username , newRoomId) {
        this.clientRef.sendMessage("/chat-app/chat/" + newRoomId + "/addUser",
            JSON.stringify({sender: username, messageType: 'JOIN'}));
        this.setState({loggedIn: true});
        this.setState({username:username})

    }

    onMessageReceive = (msg) => {
        if(msg.type === 'JOIN'){
            this.state.messages.push({username: this.state.username, message: msg.sender + " joined the room!", type:'JOIN'});
        }else if(msg.type === 'LEAVE'){
            this.state.messages.push({username: this.state.username, message: msg.sender + " left the room!", type:'LEAVE'});
        }else if(msg.type === 'CHAT'){
            this.state.messages.push({username: this.state.username, message: msg.content, type:'CHAT'});
        }

        // this.setState(prevState => ({
        //     messages: [...prevState.messages, msg]
        // }));

        this.setState({messages: this.state.messages})
    }

    render() {

        return (
            <React.Fragment>
                <Message
                    messages={this.state.messages}
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

            </React.Fragment>
        )
    }
}

export default App;