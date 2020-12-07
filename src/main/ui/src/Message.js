import React from 'react'

const Message = ({ messages, user }) => {

    return (
        <div>
            <p><h4>MESSAGES</h4></p>

                {messages.map((data, index) =>
                    <div className={(user === data.username) ? "activeUserText" : null} key={index}>{data.username} - {data.message}</div>
                )}
        </div>
    )
}

export default Message;