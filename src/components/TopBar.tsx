import React, { BaseSyntheticEvent } from 'react';
import { Box, Button, Modal } from "@mui/material";
import Client from "../misc/Client";
import ModalForm from "./forms/ModalForm";
import axios from "axios";
import { API_BASE_URL } from "../misc/miscellaneous";
import SearchBar from './forms/SearchBar';

interface ITopBar {
    setClients(clients:Array<Client>):void
    allClients:Array<Client>
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

const TopBar:React.FC<ITopBar> = ({ allClients, isOpen, setIsOpen, setClients}:ITopBar) => {

    // state for the ModalForm component
    const [newClient, setNewClient] = React.useState(new Client(0, '', '', '', '', '', '', 0));
    
    // state for the SearchBar component
    const [lastName, setLastName] = React.useState('');

    // function handling the opening and closing of the modal
    const handleClose = (e:BaseSyntheticEvent):any => {
        e.preventDefault();
        setIsOpen(!isOpen);
    }

    // function handling the API call to #create in Rails
    const handleSubmit = async () => {
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
            if(createResponse.status === 200){
                alert(createResponse.data.response);
            }            
        } catch(errors:any){
            if(errors.response.status === 500){
                alert('Server Error');
            }
        }
    }

    // These two code blocks 67 - 91 make for a poorly coded program that works. Requires two sources of truth to avoid making a costly API call
    // One source to search against and one source to view. The source to search against is never visible to the user
    const binarySearchClients = (clients:Array<Client>, lastName:string):Array<Client> => {
        let start:number = 0;
        let end:number = clients.length - 1;
        while(start <= end){
            let middle = Math.floor((start + end ) / 2);
            if(clients[middle].lastName.toLowerCase() === lastName.toLowerCase()){
                return new Array<Client>(clients[middle]);
            } else if (clients[middle].lastName.toLowerCase() < lastName.toLowerCase()) {
                start = middle + 1;
            } else {
                end = middle - 1;
            } 
        }
        return new Array<Client>();
    }

    const handleSearchSubmit = async (e:BaseSyntheticEvent) => {
        e.preventDefault();
        
        if(lastName.length !== 0){
            const result:Array<Client> = binarySearchClients(allClients, lastName);
            if(result.length !== 0) {
                setClients(result);
            } else {
                alert('No Clients found with that Name');
            }
        } else {
            setClients(allClients);
        }
    }

    return(
        <div className={'top-bar'}>
            <Button onClick={handleClose} variant={'contained'}>New Client</Button>            
            <form onSubmit={handleSearchSubmit}>
                <SearchBar setLastName={setLastName} />
            </form>
            <Modal open={isOpen} onClose={handleClose}>
                <Box sx={style}>
                    <ModalForm client={newClient} setClient={setNewClient} handleSubmit={handleSubmit}/>
                </Box>
            </Modal>
        </div>
    )
}

export default TopBar;