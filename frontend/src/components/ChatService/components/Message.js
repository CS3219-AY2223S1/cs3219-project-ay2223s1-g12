import React from 'react';

import './Message.css';

const Message = (props) => {
    return (
        <React.Fragment>
            {props.own ? 
                ( <div className="message own">
                    <div className="messageWrapper">
                        <p className="messageText">{props.message}</p>
                    </div>
                </div> ) : ( <div className="message">
                    <div className="messageWrapper">
                        <p className="messageText">{props.message}</p>
                    </div>
                </div> )
            }
        </React.Fragment>
    );
}

export default Message;
