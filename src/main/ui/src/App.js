import React, {Component} from 'react';
import './App.css';
import Login from "./Login";
import Input from "./input";
import SockJsClient from "react-stomp";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            messageText: '',
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
        console.log("123123" + msgText);
        if (this.state.username) {
            this.clientRef.sendMessage("/chat-app/chat/1/sendMessage",
                JSON.stringify({sender: this.state.username, content: msgText, type: 'CHAT'}));
            this.setState({messageText: ''})
        }
    }

    handleLoginSubmit = (username) => {
        console.log(username, " Logged in..");
        this.enterRoom(username, 1);
    }

    enterRoom(username , newRoomId) {
        console.log("456456");
        this.clientRef.sendMessage("/chat-app/chat/" + newRoomId + "/addUser",
            JSON.stringify({sender: username, messageType: 'JOIN'}));
        this.setState({loggedIn: true});
        this.setState({username:username})

    }

    onMessageReceive = (msg, topic) => {
        console.log("qweqwew");
        this.setState(prevState => ({
            messages: [...prevState.messages, msg]
        }));
    }

    render() {

        return (
            <React.Fragment>
                <SockJsClient url='http://localhost:8080/sock'
                              topics={["/chat-app/chat/"]}
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