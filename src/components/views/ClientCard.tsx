import React, {BaseSyntheticEvent} from 'react';
import Client from "../../misc/Client";
import {Button, Card, CardContent, Grid, TableCell, TableRow, Typography} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import '../../style/Table.sass'
import axios from "axios";
import {API_BASE_URL} from "../../misc/miscellaneous";

interface IClientCard {
    client:Client
}

const ClientCard:React.FC<IClientCard> = ({client}:IClientCard) => {

    const [showModal, setShowModal] = React.useState<boolean>(false);

    const handleDeleteClick = async (e:BaseSyntheticEvent) => {
        e.preventDefault();
        const deleteRequest = await axios.delete(`${API_BASE_URL}/clients/${client.id}`)
        const deleteData = await deleteRequest
        console.log(deleteData)
    }

    const handleEditClick = async (e:BaseSyntheticEvent) => {
        e.preventDefault()
        setShowModal(!showModal)
    }

    return(
        <Card className={'client-card'}>
            <CardContent>
                <Grid container className={'card-title-section'}>
                    <Typography variant={'h5'}>{client.firstName} {client.lastName}</Typography>
                    <Button className={'delete-button'} variant={'contained'} onClick={handleDeleteClick} color={'error'}>
                        <ClearIcon />
                    </Button>
                </Grid>
            </CardContent>
            <CardContent>
                <Grid>
                    <Typography variant={'h6'}>Company: {client.company}</Typography>
                    <Typography variant={'h6'}>Phone: {client.phone}</Typography>
                    <Typography variant={'h6'}>Email: {client.email}</Typography>
                </Grid>
            </CardContent>
            <CardContent>
                <Grid container sx={{ justifyContent: 'space-between'}}>
                    <Button variant={'contained'} className={'edit-button'} onClick={handleEditClick}>Edit</Button>
                    <Button variant={'contained'} className={'bottom-delete-button'} onClick={handleDeleteClick} color={'error'}>Delete</Button>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ClientCard;