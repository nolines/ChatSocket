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
        console.log(msgText);
    }

     handleLoginSubmit = (username) => {
        console.log(username, " Logged in..");
        this.state.username = username;
        this.enterRoom(1);
    }

     enterRoom(newRoomId) {
        let roomId = newRoomId;
        let topic = `/chat-app/chat/${newRoomId}`;

        this.clientRef.sendMessage("/chat-room/${roomId}",
            JSON.stringify({sender: this.state.username, type: 'JOIN'}));
    }

     onMessageReceive = (msg, topic) => {
        this.setState(prevState => ({
            messages: [...prevState.messages, msg]
        }));
    }

    render() {
        return (
            <React.Fragment>

                        <>
                            <SockJsClient url='http://localhost:8080/sock'
                                          topics={["/chat/1/addUser"]}
                                          onMessage={msg => this.onMessageReceive(msg)}
                                          onConnect={this.onConnected}
                                          onDisconnect={console.log("Disconnected!")}
                                          ref={(client) => {
                                              this.clientRef = client
                                              console.log(this.clientRef);
                                          }}
                            />
                            <Input onSendMessage={this.onSendMessage} />
                        </>
                    <Login onSubmit={this.handleLoginSubmit}/>

            </React.Fragment>
        )
    }
}

export default App;