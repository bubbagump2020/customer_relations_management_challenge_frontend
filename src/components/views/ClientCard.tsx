import React, {BaseSyntheticEvent} from 'react';
import Client from "../../misc/Client";
import {Box, Button, Card, CardContent, Grid, Modal, Typography} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import '../../style/TopContainer.sass'
import axios from "axios";
import {API_BASE_URL} from "../../misc/miscellaneous";
import ModalForm from "../forms/ModalForm";

interface IClientCard {
    client:Client
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

const ClientCard:React.FC<IClientCard> = ({ client }:IClientCard) => {

    // state for the visibility of the ClientCard modal
    const [showModal, setShowModal] = React.useState(false);

    // state for the client to be editted.
    const [editClient, setEditClient] = React.useState(client);

    // function handling the visibility of the ClientCard modal
    const handleEditClick = (e:BaseSyntheticEvent) => {
        e.preventDefault();
        setShowModal(!showModal);
    }
    // API call to #destroy in Rails
    const handleDeleteClick = async () => {
        try{
            const request = await axios.delete(`${API_BASE_URL}/clients/${client.id}`);
            const response = await request;
            if(response.status === 200){
                alert(response.data.response);
                // For some reason even without the e.preventDefault() the page still won't reload, using this
                // to force a page reload.
                window.location.reload();

            }
        } catch(errors:any){
            if(errors.response.status === 404){
                alert('Client Not Found');
            }
        }
    }
    // API call to #update in Rails
    const handleSubmit = async (e:BaseSyntheticEvent) => {
        try{
            await axios.put(`${API_BASE_URL}/clients/${editClient.id}`, {
                first_name: editClient.firstName,
                last_name: editClient.lastName,
                email: editClient.email,
                phone: editClient.phone,
                company: editClient.company,
                probability: editClient.probability,
                stage: editClient.stage
            });
        } catch(errors:any) {
            if(errors.response.status === 404){
                alert('Client Not Found');
            }
        }
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
                    <br/>
                    <Typography variant={'h5'}>Sale Probability: {client.probability}%</Typography>
                    <br/>
                    <Typography variant={'h5'}>Stage: {client.stage}</Typography>
                </Grid>
                <br/>
                <Grid>
                    <Typography variant={'h6'}>Company: {client.company}</Typography>
                    <br/>
                    <Typography variant={'h6'}>Phone: {client.phone}</Typography>
                    <br/>
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
                    <ModalForm client={editClient} setClient={setEditClient} handleSubmit={handleSubmit}/>
                </Box>
            </Modal>
        </Card>
    );
}

export default ClientCard;