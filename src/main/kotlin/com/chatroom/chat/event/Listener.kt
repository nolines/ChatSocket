package com.chatroom.chat.event

import com.chatroom.chat.model.Message
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.context.event.EventListener
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.messaging.simp.stomp.StompHeaderAccessor
import org.springframework.stereotype.Component
import org.springframework.web.socket.messaging.SessionConnectedEvent
import org.springframework.web.socket.messaging.SessionDisconnectEvent
import java.lang.String.format


@Component
class Listener(val messagingTemplate: SimpMessagingTemplate) {

    private val logger: Logger = LoggerFactory.getLogger(Listener::class.java)

    /**
     * Receives websocket connections
     * */
    @EventListener
    fun handleWebSocketConnectListener(event: SessionConnectedEvent?) {
        logger.info("Received a new web socket connection.")
    }

    /**
     * Its called when the user has been disconneted
     * */
    @EventListener
    fun handleWebSocketDisconnectListener(event: SessionDisconnectEvent) {
        val headerAccessor = StompHeaderAccessor.wrap(event.message)
        val username = headerAccessor.sessionAttributes!!["username"] as String?
        val roomId = headerAccessor.sessionAttributes!!["room_id"] as String?
        if (username != null) {
            logger.info("User Disconnected: $username")
            val chatMessage = Message(Message.MessageType.LEAVE, username)
            messagingTemplate.convertAndSend(format("/channel/$roomId"), chatMessage)
        }
    }
}