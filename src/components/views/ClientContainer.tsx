import React from "react";
import axios from "axios";
import {API_BASE_URL, customFilter} from "../../misc/miscellaneous";
import ClientCard from "./ClientCard";
import Client from "../../misc/Client";
import {Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

interface IClientContainer {
    clients:Array<Client>
    setClients(clients:Array<Client>):void
    searchTerm:string
}

const ClientContainer:React.FC<IClientContainer> = ({clients, setClients, searchTerm}:IClientContainer) => {

    // Just used to contain the cards

        const showClients = (clients:Array<Client>) => {
        return clients.map((client, index) => {
            return <ClientCard key={index} client={client} clients={clients} setClients={setClients}/>
        })
    }

    return(
        <Grid className={'show-clients-container'} container >
            {showClients(clients)}
        </Grid>
    )
}

export default ClientContainer;