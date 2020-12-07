package com.chatroom.chat.model

import java.time.LocalDateTime

class Message(messageType: MessageType?, sender: String) {

    enum class MessageType {
        CHAT, JOIN, LEAVE
    }

    private var content: String? = null
    private var sender: String? = sender
    private var messageType: MessageType? = messageType
    private var date: LocalDateTime? = LocalDateTime.now()

    fun getType(): MessageType? {
        return messageType
    }

    fun getContent() : String? {
        return content
    }

    fun getSender() : String? {
        return sender
    }

    fun getDate(): LocalDateTime? {
        return date
    }
}