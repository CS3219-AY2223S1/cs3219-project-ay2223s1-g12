import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Chip from '@mui/material/Chip';


function CountdownView(props) {


    const center = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontSize: '20px'
      };
    
    
    const insideCircle = ({remainingTime}) => {
        if (remainingTime === 0) {
            return "Sorry, no match found";
        } else {
             return `${remainingTime}`;
    }}

    const messages = {
        finding: "Finding a match...",
        found: "Match found!",
        notFound: "Sorry, no match found"
    }

    const[message, setMessage] = useState(messages.finding);


    return (
        <div style={center}>
            <CountdownCircleTimer 
                size={240}
                isPlaying
                duration={30}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[30, 20, 10, 0]}
                strokeWidth={12}
                onComplete= {() => {
                    setMessage(messages.notFound)
                }}
            >
                {insideCircle}
            </CountdownCircleTimer>
            <Chip sx = {{ margin: 2 }} size="medium" label={message} variant="outlined" />
        </div>
    )
}

export default CountdownView;
