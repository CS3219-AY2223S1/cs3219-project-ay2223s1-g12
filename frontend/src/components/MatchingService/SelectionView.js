import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DifficultyCard from './DifficultyCard';
import CountdownView from './CountdownView';


export default function SelectionView() {
    const difficultyLevels = ["easy", "medium", "hard"];
    const [showModal, setShowModal] = useState(false);
    const [socket, setSocket] = useState(null);

    const handleOpenModal = (socket) => {
      setShowModal(true);
      console.log('Countdown timer modal opened');
      setSocket(socket);
      console.log(socket);
    }

    const handleCloseModal = (e) => {
      setShowModal(false);
      console.log('Countdown timer modal close');
    }

    return (
    <Box sx={{ flexGrow: 1, margin: 'auto', maxWidth:'100%'}}>
        <Grid container spacing={2}>
        {difficultyLevels.map(difficultyLevel =>
                 <Grid key={difficultyLevel} item xs={'auto'}>
                     <DifficultyCard difficulty={difficultyLevel} handleOpenModal={handleOpenModal}/>
                </Grid>)}
                <CountdownView show={showModal} handleCloseModal={handleCloseModal} socket={socket} />
          </Grid>
        </Box>
      );
    }
    



