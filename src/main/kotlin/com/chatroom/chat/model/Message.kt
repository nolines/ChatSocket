package com.chatroom.chat.model

class Message(private var messageType: MessageType?, sender: String) {

    enum class MessageType {
        CHAT, JOIN, LEAVE
    }

    private var content: String? = null
    private var sender: String? = sender

    fun getType(): MessageType? {
        return messageType
    }

    fun getContent() : String? {
        return content
    }

    fun getSender() : String? {
        return sender
    }
}