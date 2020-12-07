import React from 'react'

const Message = ({ messages, user }) => {

    return (
        <div>
            <p><h4>MESSAGES</h4></p>

                {messages.map((data, index) =>
                    <div className={(user === data.username) ? "activeUserText" : null} key={index}>
                        <p><b>{data.username}</b> : {data.message}</p> <p className={"text-muted"}>{data.date.slice(0, data.date.lastIndexOf("."))}</p>
                    </div>
                )}
        </div>
    )
}

export default Message;