import React, { BaseSyntheticEvent } from "react";
import ClientCard from "./ClientCard";
import Client from "../../misc/Client";
import {Grid, Box, Pagination } from "@mui/material";

// ClientContainer will control the state of ClientCards
// ClientContainer will not control the state of ClientCards child components
// State control will also include functions that hanlde any sort of change.

interface IClientContainer {
    clients:Array<Client>
    setClients(clients:Array<Client>):void
}

const ClientContainer:React.FC<IClientContainer> = ({ clients, setClients }:IClientContainer) => {

    // constants for the pagination
    const ITEMS_PER_PAGE:number = 20;
    const PAGE_COUNT:number = Math.ceil(clients.length / ITEMS_PER_PAGE);

    // state for the current page of pagination
    const [currentPage, setCurrentPage] = React.useState(1);

    // function for showing clients on current page
    const showClients = (clients:Array<Client>) => {
        const start:number = (currentPage - 1) * ITEMS_PER_PAGE;
        const end:number = start + ITEMS_PER_PAGE;
        const pageClients:Array<Client> = clients.slice(start, end);
        return pageClients.map((client, index) => {
            return <ClientCard key={index} client={client} />
        });
    }

    // function for handling the pagination page change
    const handlePageChange = (e:BaseSyntheticEvent) => {
        e.preventDefault();
        const newPage:number = parseInt(e.target.innerText);
        setCurrentPage(newPage);
    }

    return(
        <Box  className={"clients-container"}>
            <Grid container className={'clients-container-grid'}>
                <Pagination
                    count={PAGE_COUNT}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </Grid>
            <Grid container className={'clients-container-grid'}>{showClients(clients)}</Grid>
            <Grid container className={'clients-container-grid'}>
                <Pagination
                    count={PAGE_COUNT}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </Grid>  
        </Box>
    )
}

export default ClientContainer;