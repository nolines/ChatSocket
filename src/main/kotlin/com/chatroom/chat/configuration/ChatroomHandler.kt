//package com.chatroom.chat.configuration
//
//import org.springframework.web.socket.CloseStatus
//import org.springframework.web.socket.TextMessage
//import org.springframework.web.socket.WebSocketSession
//import org.springframework.web.socket.handler.TextWebSocketHandler
//
//class ChatroomHandler : TextWebSocketHandler() {
//
//    private var webSocketSessions : MutableList<WebSocketSession> = mutableListOf()
//
//    override fun afterConnectionEstablished(session: WebSocketSession) {
//        webSocketSessions.add(session)
//    }
//
//    override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {
//        for (webSocketSession in webSocketSessions) {
//            webSocketSession.sendMessage(message);
//        }
//    }
//
//    override fun afterConnectionClosed(session: WebSocketSession, status: CloseStatus) {
//        webSocketSessions.remove(session)
//    }
//}