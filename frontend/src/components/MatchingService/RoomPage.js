import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import LogoutIcon from '@mui/icons-material/Logout';


export default function RoomPage() {
    return (
            <Grid container spacing={0.5} sx={{backgroundColor:'white', width:'100vw', height:'100vh', margin: '0px'}}>
                {/* left panel */}
                <Grid item xs={5} md={5}>
                    <Stack spacing={0.5}>
                        {/* room number and leave room button */}
                        <Box sx={{height: "9.5vh", display:'flex', justifyContent:'flex-start', alignItems:'center', backgroundColor: 'white'}}>
                            <Typography variant="h6" sx={{margin: 2}}> Room {110} </Typography> 
                            <Button variant="outlined" endIcon={<LogoutIcon />}>
                              Leave Room 
                            </Button>    
                        </Box>
                        {/* question box */}
                        <Box sx={{height: "58vh", display:'flex', justifyContent:'flex-start', alignItems:'center', 
                                  backgroundColor: 'white', border: 1.5, borderColor: 'green', borderRadius: 4}}>
                            <Typography variant="h6" sx={{margin: 2}}> Placeholder question box </Typography> 
                        </Box>
                        {/*chat box */}
                        <Box sx={{height: "30vh", display:'flex', justifyContent:'flex-start', alignItems:'center', 
                                  backgroundColor: 'white', border: 1.5, borderColor: 'orange', borderRadius: 4}}>
                            <Typography variant="h6" sx={{margin: 2}}> Placeholder chat box </Typography> 
                        </Box>
                    </Stack>
                </Grid>
                
                {/* right panel */}
                <Grid item xs={6.98} md={6.98} sx={{height: "100vh"}}>
                    <Stack spacing={0}>
                        {/* code box */}
                        <Box sx={{height: "99vh", display:'flex', justifyContent:'flex-start', alignItems:'center', 
                                  backgroundColor: 'white', border: 1.5, borderColor: 'grey', borderRadius: 4}}>
                            <Typography variant="h6" sx={{margin: 2}}> Placeholder code box </Typography> 
                        </Box>
                    </Stack>
                </Grid>

            </Grid>
    )
}