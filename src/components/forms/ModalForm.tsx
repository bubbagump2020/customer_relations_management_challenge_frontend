import React from "react";
import Client from "../../misc/Client";
import {Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";

interface IModalForm{
    client:Client
}

const ModalForm:React.FC<IModalForm> = ({client}:IModalForm) => {

    const [editedClient, setEditedClient] = React.useState(client);

    const stages:Array<string> = ['Closed', 'Contacted', 'Diligence', 'Lead', 'Rejected'];

    const showStageValues = (stages:Array<string>) => {
        return stages.map((stage, index) => {
            return <MenuItem key={index} value={stage}>{stage}</MenuItem>
        })
    }

    return(
        <Box component={'form'} sx={{ '& .MuiTextField-root': {m: 1, width: '25ch'} }}>
            <div>
                <Typography variant={'h6'}>Client Name</Typography>
                <TextField
                    required
                    id={'first-name-required'}
                    label={'First Name'}
                    defaultValue={editedClient.firstName}
                    onChange={ e => setEditedClient({...editedClient, firstName: e.target.value})}
                    variant={'filled'}
                />
                <TextField
                    required
                    id={'last-name-required'}
                    label={'Last Name'}
                    defaultValue={editedClient.lastName}
                    onChange={ e => setEditedClient({...editedClient, lastName: e.target.value})}
                    variant={'filled'}
                />
            </div>
            <div>
                <Typography variant={'h6'}>Client Contact</Typography>
                <TextField
                    required
                    id={'email-required'}
                    label={'Email'}
                    defaultValue={editedClient.email}
                    onChange={ e => setEditedClient({...editedClient, email: e.target.value })}
                    variant={'filled'}
                />
                <TextField
                    id={'phone-number'}
                    label={'Phone'}
                    defaultValue={editedClient.phone}
                    onChange={ e => setEditedClient({ ...editedClient, phone: e.target.value})}
                    variant={'filled'}
                />
                <TextField
                    id={'company'}
                    label={'Company'}
                    defaultValue={editedClient.company}
                    onChange={ e => setEditedClient({...editedClient, company: e.target.value})}
                    variant={'filled'}
                />
            </div>
            <div>
                <Typography variant={'h6'}>Client Viability</Typography>
                <TextField
                    required
                    id={'client-stage'}
                    label={'Client Probability'}
                    defaultValue={editedClient.probability}
                    onChange={ e => setEditedClient({ ...editedClient, probability: parseInt(e.target.value)})}
                    variant={'filled'}
                />
                <FormControl sx={{ width: '50%', marginTop: '8px'}}>
                    <InputLabel id={'stage-select-label'}>Stage</InputLabel>
                    <Select
                        labelId={'stage-select-label'}
                        id={'stage-select'}
                        value={editedClient.stage}
                        label={'Stage'}
                        onChange={e => setEditedClient({...editedClient, stage: e.target.value})}
                        variant={'filled'}
                    >
                        {showStageValues(stages)}
                    </Select>
                </FormControl>
            </div>
        </Box>
    )
}

export default ModalForm

/*
*
* Closed
* Contacted
* Diligence
* Lead
* Rejected
*
*/