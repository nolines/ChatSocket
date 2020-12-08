# ChatSocket
fullstack chat app with spring+web socket 


### DESCRIPTION

Chat application works on the websocket.

### TECH STACK

Backend : Kotlin, SpringBoot and websocket client.

Frontend : React with react-socket libraries and some basic material-ui


### RUN

frontend exposes 3000 port
backend exposes 8080 port

< docker build --file=frontend/Dockerfile  -t frontend-chat . >.  /// created docker image for frontend

< docker build --file=Dockerfile  -t backend-chat . > /// created docker image for backend

< docker-compose -f docker-compose.yml up > /// compose file fire up backend and frontend together !


### DEMO

![demonstration](https://media.giphy.com/media/NAQRWLjOXNApWj42G2/giphy.gif)
