import React from 'react';

const api = {
    send: (stompClient, username, text) => {
        let topic = `/chat-app/chat/1`;
        if(text && stompClient) {
            let chatMessage = {
                sender: username,
                content: text,
                type: 'CHAT'
            };

            stompClient.send(`${topic}/sendMessage`, {}, JSON.stringify(chatMessage));
        }
    }
}


export default api;