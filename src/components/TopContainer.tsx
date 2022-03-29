import React from 'react';
import ClientContainer from "./views/ClientContainer";
import '../style/TopContainer.sass';
import TopBar from "./TopBar";
import Client from "../misc/Client";
import axios from "axios";
import {API_BASE_URL} from "../misc/miscellaneous";

const TopContainer:React.FC = () => {

    // state for the visibile list of clients that have been searched for
    const [visibleClients, setClients] = React.useState<Array<Client>>([]);
    // unmodified list of clients
    const [allClients, setAllClients] =React.useState<Array<Client>>([]);
    // state for the visibility of the TopBar modal
    const [isOpen, setIsOpen] = React.useState(false);

    // API call to #index in Rails
    React.useEffect(() => {
        const fetchClients = async () => {
            const request = await axios.get(`${API_BASE_URL}/clients`);
            const response = await request;
            setClients(Client.createArrayOfClients(response.data));
            setAllClients(Client.createArrayOfClients(response.data));
        }
        fetchClients();
    }, []);

    return(
        <div style={{ overflowY: 'hidden'}}>
            <TopBar allClients={allClients} isOpen={isOpen} setIsOpen={setIsOpen} setClients={setClients}/>
            <ClientContainer clients={visibleClients} setClients={setClients}/>
        </div>
    );
}

export default TopContainer;