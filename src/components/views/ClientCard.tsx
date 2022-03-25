import React from 'react';
import Client from "../../misc/Client";
import {TableCell, TableRow} from "@mui/material";

interface IClientCard {
    client:Client
}

const ClientCard:React.FC<IClientCard> = ({client}:IClientCard) => {

    return(
        <TableRow>
            <TableCell>{client.firstName}</TableCell>
            <TableCell>{client.lastName}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.stage}</TableCell>
            <TableCell>{client.phone}</TableCell>
            <TableCell>{client.company}</TableCell>
            <TableCell>{client.probability}</TableCell>
        </TableRow>
    )
}

export default ClientCard;