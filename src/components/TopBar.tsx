import React, {BaseSyntheticEvent, ChangeEvent} from 'react';
import {Box, Button, Grid, Modal, TextField} from "@mui/material";
import Client from "../misc/Client";
import ModalForm from "./forms/ModalForm";
import axios from "axios";
import {API_BASE_URL} from "../misc/miscellaneous";

interface ITopBar {
    setClients(clients:Array<Client>):void
    isOpen:boolean
    setIsOpen(isOpen:boolean):void
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

const TopBar:React.FC<ITopBar> = ({isOpen, setIsOpen, setClients}:ITopBar) => {

    const [newClient, setNewClient] = React.useState(new Client(0, '', '', '', '', '', '', 0))

    const handleClose = (e:BaseSyntheticEvent) => {
        e.preventDefault();
        setIsOpen(!isOpen)
    }

    const handleSubmit = async (e:BaseSyntheticEvent) => {
        e.preventDefault();
        try{
            const createRequest = await axios.post(`${API_BASE_URL}/clients`,{
                first_name: newClient.firstName,
                last_name: newClient.lastName,
                email: newClient.email,
                phone: newClient.phone,
                company: newClient.company,
                probability: newClient.probability,
                stage: newClient.stage
            })
            const createResponse = await createRequest
            const { clients } = createResponse.data;
            setClients(clients);
        } catch(errors:any){
            if(errors.response.status === 500){
                alert('Server Error')
            }
        }
    }

    return(
        <div className={'top-bar'}>
            <Button onClick={handleClose} size={'large'} variant={'contained'}>New Client</Button>
            <Modal open={isOpen} onClose={handleClose}>
                <Box sx={style}>
                    <ModalForm client={newClient} setClient={setNewClient} handleSubmit={handleSubmit}/>
                </Box>
            </Modal>
        </div>
    )
}

export default TopBar;