import React from "react";
import axios from "axios";
import {API_BASE_URL} from "../../misc/miscellaneous";

const ClientContainer:React.FC = () => {

    const [clients, setClients] = React.useState([]);

    React.useEffect(() => {
        const fetchClients = async () => {
            const fetchResponse = await axios.get(`${API_BASE_URL}/clients`)
            const responseData = await fetchResponse.data;
            console.log(responseData);
        }
        fetchClients();
    }, [])

    const showClients = () => {

    }

    return(
        <div>

        </div>
    )
}

export default ClientContainer;