import React, {BaseSyntheticEvent} from 'react';
import Client from "../../misc/Client";
import {Box, Button, Card, CardContent, Grid, Modal, TableCell, TableRow, Typography} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import '../../style/Table.sass'
import axios from "axios";
import {API_BASE_URL} from "../../misc/miscellaneous";
import ModalForm from "../forms/ModalForm";

interface IClientCard {
    client:Client
    clients:Array<Client>
    setClients(clients:Array<Client>):void
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ClientCard:React.FC<IClientCard> = ({client, clients, setClients}:IClientCard) => {

    const [showModal, setShowModal] = React.useState(false);

    const handleDeleteClick = async (e:BaseSyntheticEvent) => {
        e.preventDefault();
        const deleteRequest = await axios.delete(`${API_BASE_URL}/clients/${client.id}`)
        const deleteData = await deleteRequest
        console.log(deleteData)
    }

    const handleEditClick = (e:BaseSyntheticEvent) => {
        e.preventDefault()
        setShowModal(!showModal)
    }

    return(
        <Card className={'client-card'}>
            <CardContent>
                <Grid container className={'card-title-section'}>
                    <Typography variant={'h4'}>{client.firstName} {client.lastName}</Typography>
                    <Button className={'delete-button'} variant={'contained'} onClick={handleDeleteClick} color={'error'}>
                        <ClearIcon />
                    </Button>
                </Grid>
            </CardContent>
            <CardContent>
                <Grid>
                    <Typography variant={'h5'}>Sale Stage: {client.stage}</Typography>
                    <Typography variant={'h5'}>Sale Probability: {client.probability}%</Typography>
                </Grid>
                <Grid>
                    <Typography variant={'h6'}>Company: {client.company}</Typography>
                    <Typography variant={'h6'}>Phone: {client.phone}</Typography>
                    <Typography variant={'h6'}>Email: {client.email}</Typography>
                </Grid>
                <div />

            </CardContent>
            <CardContent>
                <Grid container sx={{ justifyContent: 'space-between'}}>
                    <Button variant={'contained'} className={'edit-button'} onClick={handleEditClick}>Edit</Button>
                    <Button variant={'contained'} className={'bottom-delete-button'} onClick={handleDeleteClick} color={'error'}>Delete</Button>
                </Grid>
            </CardContent>
            <Modal open={showModal} onClose={handleEditClick} >
                <Box sx={style}>
                    <ModalForm client={client} />
                </Box>
            </Modal>
        </Card>
    )
}

export default ClientCard;