import React from "react";
import axios from "axios";
import {API_BASE_URL} from "../../misc/miscellaneous";
import ClientCard from "./ClientCard";
import Client from "../../misc/Client";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const ClientContainer:React.FC = () => {

    const [clients, setClients] = React.useState<Array<Client>>([]);

    React.useEffect(() => {
        const fetchClients = async () => {
            const fetchResponse = await axios.get(`${API_BASE_URL}/clients`)
            const responseData = await fetchResponse.data;
            setClients(Client.createArrayOfClients(responseData));
            console.log(responseData);
        }
        fetchClients();
    }, [])

    const showClients = (clients:Array<Client>) => {
        return clients.map((client, index) => {
            return <ClientCard key={index} client={client} />
        })
    }

    return(
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Stage</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Company</TableCell>
                        <TableCell>Probability</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {showClients(clients)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ClientContainer;