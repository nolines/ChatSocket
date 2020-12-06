package com.chatroom.chat.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.socket.WebSocketHandler
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker
import org.springframework.web.socket.config.annotation.WebSocketConfigurer
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry

@Configuration
@EnableWebSocketMessageBroker
class WebSocketConfiguration : WebSocketConfigurer {
    override fun registerWebSocketHandlers(webSocketHandlerRegistry: WebSocketHandlerRegistry) {
        webSocketHandlerRegistry.addHandler(getWebSocketHandler(), "/chat")
                .setAllowedOrigins("*")
    }

    @Bean
    fun getWebSocketHandler() : WebSocketHandler {
        return ChatroomHandler()
    }

}