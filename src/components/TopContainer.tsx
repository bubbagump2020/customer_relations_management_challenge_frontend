import React, {BaseSyntheticEvent} from 'react';
import ClientContainer from "./views/ClientContainer";
import '../style/Table.sass';
import TopBar from "./TopBar";
import Client from "../misc/Client";
import axios from "axios";
import {API_BASE_URL} from "../misc/miscellaneous";

const TopContainer:React.FC = () => {

    // This container is where I'll call the index API and state for child components is controlled

    const [clients, setClients] = React.useState<Array<Client>>([]);
    const [isOpen, setIsOpen] = React.useState(false);


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
            <TopBar isOpen={isOpen} setIsOpen={setIsOpen} setClients={setClients}/>
            <ClientContainer clients={clients} setClients={setClients}/>
        </div>
    )
}

export default TopContainer;