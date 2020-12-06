package com.chatroom.chat.controller

import com.chatroom.chat.model.Message
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.messaging.handler.annotation.DestinationVariable
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.Payload
import org.springframework.messaging.simp.SimpMessageHeaderAccessor
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller
import java.lang.String.format

@Controller
class ChatroomController(val messagingTemplate: SimpMessagingTemplate) {

    private val logger: Logger = LoggerFactory.getLogger(ChatroomController::class.java)

    @MessageMapping("/chat/{roomId}/sendMessage")
    fun sendMessage(@DestinationVariable roomId : String, @Payload chatMessage : Message) {
        logger.info(roomId +" Chat message received is " + chatMessage.getContent());
        messagingTemplate.convertAndSend(format("/chat-room/${roomId}"), chatMessage);
    }

    @MessageMapping("/chat/{roomId}/addUser")
    fun addUser(@DestinationVariable roomId : String, @Payload chatMessage : Message,
                 headerAccessor: SimpMessageHeaderAccessor) {
        val currentRoomId : String = headerAccessor.getSessionAttributes()?.put("room_id", roomId) as String
        if (currentRoomId != null) {
            val leaveMessage = Message(Message.MessageType.LEAVE, chatMessage.getSender()!!)
            messagingTemplate.convertAndSend(format("/chat-room/${currentRoomId}"), leaveMessage);
        }
        headerAccessor.getSessionAttributes()?.put("name", chatMessage.getSender());
        messagingTemplate.convertAndSend(format("/chat-room/${roomId}"), chatMessage)
    }


}