import React from 'react'

const Message = ({ messages }) => {

    return (
        <>
                {messages.map((data, index) =>
                    <div key={index}>{data.username} - {data.message}</div>
                )}
        </>
    )

}

export default Message;