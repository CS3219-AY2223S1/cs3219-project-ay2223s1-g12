import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import sapling from '../../images/sapling.png';
import youngtree from '../../images/youngtree.png'
import tree from '../../images/tree.png';
import { io } from "socket.io-client";


export default function DifficultyCard(props) {

  const handleFindMatchClick = (e) => {
    e.preventDefault();
    console.log(`${props.difficulty} button was clicked`);

    const socket = io("http://localhost:8001");
    // const socket = io.of('/pendingMatches');
    // const socket = io("http://localhost:8001/pendingMatches")

    socket.on("connect", () => {
      console.log(socket.connected); // true
    });

    // testing 22/09/2022: hard-coded username
    socket.emit(`match-${props.difficulty}`, { username: "John" });
    props.handleOpenModal(socket);
  }

  const difficultyImageMap = { "easy" : sapling, "medium" : youngtree, "hard" : tree}
  const difficultyTextMap = { "easy" : "Beginner-friendly",
                              "medium" : "Intermediate Questions", 
                              "hard" : "Tests advanced concepts"}
  const difficultyColorMap = { "easy": "#4caf50",
                               "medium": "#ffca28",
                               "hard": "#d32f2f"
                              }

  return (
    <Card sx={{minWidth: 200, maxWidth: 320, borderTop: '3px solid', borderTopColor: difficultyColorMap[props.difficulty]}}>
      <Typography variant="h5" color="424242" sx={{textAlign: 'center', paddingTop: '1em', paddingBottom: '1em'}}>
        {(props.difficulty)[0].toUpperCase() + (props.difficulty.slice(1))} 
      </Typography>
        <CardMedia
          component="img"
          height="70"
          width="70"
          image={difficultyImageMap[props.difficulty]}
          alt="plant"
          sx ={{objectFit: "contain"}}
    
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary"  sx={{textAlign: 'center'}} >
            {difficultyTextMap[props.difficulty]}
          </Typography>

        </CardContent>
        <CardActions>
        <Button size="medium" variant="outlined"  sx={{margin: 'auto', textTransform:'none', color: "#424242", borderColor: "#424242"}}
          onClick={handleFindMatchClick}>
          Find Match</Button>
      </CardActions>
    </Card>
  );
}
