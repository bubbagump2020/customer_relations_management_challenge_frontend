import React from "react";
import axios from "axios";
import {API_BASE_URL} from "../../misc/miscellaneous";
import ClientCard from "./ClientCard";
import Client from "../../misc/Client";
import {Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const ClientContainer:React.FC = () => {

    const [clients, setClients] = React.useState<Array<Client>>([]);

    React.useEffect(() => {
        const fetchClients = async () => {
            const fetchResponse = await axios.get(`${API_BASE_URL}/clients`)
            const responseData = await fetchResponse.data;
            setClients(Client.createArrayOfClients(responseData));
        }
        fetchClients();
    }, [])

    const showClients = (clients:Array<Client>) => {
        return clients.map((client, index) => {
            return <ClientCard key={index} client={client} clients={clients} setClients={setClients}/>
        })
    }

    return(
        <Grid container sx={{ justifyContent: 'center' }}>
            {showClients(clients)}
        </Grid>
    )
}

export default ClientContainer;