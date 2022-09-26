import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Button from '@mui/material/Button';


function CountdownView(props) {

    const modal = {
        position: 'fixed',
        left: '0',
        top: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const center = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        width: '50vw',
        fontSize: '20px',
        backgroundColor: '#ffffff'
      };

    const messages = {
        finding: "Finding a match...",
        found: "Match found!",
        notFound: "Sorry, no match found"
    }

    const[matchingStatus, setMatchingStatus] = useState('match-finding');
    const navigate = useNavigate();


    if (!props.show) {
        return null;
    }

    const socket = props.socket;
    console.log(socket);

    socket.on("match-success", () => setMatchingStatus('match-success'));
    socket.on("match-failure", () => setMatchingStatus('match-fail'));

    const insideCircle = ({remainingTime}) => {
        if (remainingTime === 0) {
            return "Sorry, no match found";
        } else {
             return `${remainingTime}`;
    }}

    if (matchingStatus === 'match-success') {
        navigate('/roompage');
    }

    return (
        <div style={modal}>
            <div style={center}>
                <CountdownCircleTimer 
                    size={240}
                    isPlaying
                    duration={30}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[30, 20, 10, 0]}
                    strokeWidth={12}
                    onComplete= {() => {
                        setMatchingStatus('match-fail')
                        socket.emit('no-match-found');
                        console.log('failed');
                    }}
                >
                    {insideCircle}
                </CountdownCircleTimer>  
                {matchingStatus === 'match-fail' && "Try again later!"}
                {matchingStatus !== 'match-fail' && messages.finding}

                <Button variant="outlined" sx={{margin: 1}} 
                    onClick={() => {
                        setMatchingStatus('match-finding');
                        console.log('psst');
                        socket.emit('match-cancel', { username: "John" });
                        props.handleCloseModal();
                     }}> Cancel </Button>
            </div>
        </div>
    )
}

export default CountdownView;
