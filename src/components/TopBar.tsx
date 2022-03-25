import React, {BaseSyntheticEvent, ChangeEvent} from 'react';
import {Box, Button, Grid, TextField} from "@mui/material";
import Client from "../misc/Client";



const TopBar:React.FC = () => {

    return(
        <Grid container className={'top-bottom-bar'}>
            <Button variant={'contained'}>New Client</Button>
        </Grid>
    )
}

export default TopBar;