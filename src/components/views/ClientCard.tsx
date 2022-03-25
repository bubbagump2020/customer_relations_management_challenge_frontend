import React, {BaseSyntheticEvent} from 'react';
import Client from "../../misc/Client";
import {Button, TableCell, TableRow} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import '../../style/Table.sass'
import axios from "axios";
import {API_BASE_URL} from "../../misc/miscellaneous";

interface IClientCard {
    client:Client
}

const ClientCard:React.FC<IClientCard> = ({client}:IClientCard) => {

    const handleClick = async (e:BaseSyntheticEvent) => {
        e.preventDefault();
        const deleteRequest = await axios.delete(`${API_BASE_URL}/clients/${client.id}`)
        const deleteData = await deleteRequest
        console.log(deleteData)
    }

    return(
        <TableRow>
            <TableCell>{client.firstName}</TableCell>
            <TableCell>{client.lastName}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.stage}</TableCell>
            <TableCell>{client.phone}</TableCell>
            <TableCell>{client.company}</TableCell>
            <TableCell>{client.probability}</TableCell>
            <TableCell>
                <Button onClick={handleClick} className={'clear-button'} variant={'contained'} color={'error'} >
                    <ClearIcon />
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default ClientCard;