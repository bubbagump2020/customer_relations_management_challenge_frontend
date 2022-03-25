import React from 'react';
import ClientContainer from "./views/ClientContainer";
import '../style/Table.sass';
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import Client from "../misc/Client";
import axios from "axios";
import {API_BASE_URL} from "../misc/miscellaneous";

const TopContainer:React.FC = () => {

    // This container is where I'll call the index API

    const [clients, setClients] = React.useState<Array<Client>>([]);
    const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        const fetchClients = async () => {
            const fetchRequest = await axios.get(`${API_BASE_URL}/clients`)
            const fetchResponse = await fetchRequest
            setClients(Client.createArrayOfClients(fetchResponse.data))
        }
        fetchClients();
    }, [])

    return(
        <div style={{ overflowY: 'hidden'}}>
            <TopBar clients={clients} setClients={setClients} setSearchTerm={setSearchTerm}/>
            <ClientContainer searchTerm={searchTerm} clients={clients} setClients={setClients}/>
            <BottomBar />
        </div>
    )
}

export default TopContainer;