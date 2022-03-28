import React from "react";
import ClientCard from "./ClientCard";
import Client from "../../misc/Client";
import {Grid} from "@mui/material";

interface IClientContainer {
    clients:Array<Client>
    setClients(clients:Array<Client>):void
}

const ClientContainer:React.FC<IClientContainer> = ({ clients, setClients }:IClientContainer) => {

    const showClients = (clients:Array<Client>) => {
        return clients.map((client, index) => {
            return <ClientCard key={index} client={client} setClients={setClients}/>
        })
    }

    return(
        <Grid className={'show-clients-container'} container >
            {showClients(clients)}
        </Grid>
    )
}

export default ClientContainer;