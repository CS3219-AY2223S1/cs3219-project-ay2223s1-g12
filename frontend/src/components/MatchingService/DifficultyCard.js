import React,{ useContext } from 'react';
import { SocketContext } from './SocketContext'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import sapling from '../../images/sapling.png';
import youngtree from '../../images/youngtree.png'
import tree from '../../images/tree.png';


export default function DifficultyCard(props) {

  const { getSocket } = useContext(SocketContext);

  const handleFindMatchClick = (e) => {
    e.preventDefault();
    console.log(`${props.difficulty} button was clicked`);

    const socket = getSocket();
    
    socket.on("connect", () => {
      console.log(socket.connected); // true
    });

    //null value to be passed in for username for now 
    socket.emit(`match-${props.difficulty}`, {});
    props.handleOpenModal(socket);
  }

  const difficultyImageMap = { "easy" : sapling, "medium" : youngtree, "hard" : tree}
  const difficultyTextMap = { "easy" : "Beginner-friendly",
                              "medium" : "Intermediate level", 
                              "hard" : "Advanced Concepts"}
  const difficultyColorMap = { "easy": "#4caf50",
                               "medium": "#ffca28",
                               "hard": "#d32f2f"
                              }

  return (
    <Card sx={{backgroundColor: "RGBA(51,112,255,0.6)",
              '&:hover': {
                backgroundColor: '#F7CF1C !important', 
               },
               minHeight: 260, 
               maxHeight: 260, 
               minWidth: 160,
               maxWidth: 160, 
               borderTop: '3px solid', 
               borderTopColor: difficultyColorMap[props.difficulty]}}>
      <Typography variant="h6" color="#ffffff" sx={{textAlign: 'center', paddingTop: '1em', paddingBottom: '1em'}}>
        {(props.difficulty)[0].toUpperCase() + (props.difficulty.slice(1))} 
      </Typography>
        <CardMedia
          component="img"
          height="50"
          width="50"
          image={difficultyImageMap[props.difficulty]}
          alt="plant"
          sx ={{objectFit: "contain"}}
    
        />
        <CardContent sx={{textAlign: "center"}}>
          <Typography color="#ffffff" variant="caption" sx={{textAlign: 'center'}}>
            {difficultyTextMap[props.difficulty]}
          </Typography>

        </CardContent>
        <CardActions>
        <Button size="medium" variant="contained"  sx={{margin: 'auto', textTransform:'none', color: "#ffffff", borderColor: "#ffffff", backgroundColor:"#132439" }}
          onClick={handleFindMatchClick}>
          Find Match</Button>
      </CardActions>
    </Card>
  );
}
