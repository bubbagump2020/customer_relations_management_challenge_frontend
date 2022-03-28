import React, {BaseSyntheticEvent} from "react";
import Client from "../../misc/Client";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";

interface IModalForm{
    client:Client
    setClient(client:Client):void
    handleSubmit(e:BaseSyntheticEvent):void
}

const ModalForm:React.FC<IModalForm> = ({client, setClient, handleSubmit}:IModalForm) => {

    const stages:Array<string> = ['Closed', 'Contacted', 'Diligence', 'Lead', 'Rejected'];
    const showStageValues = (stages:Array<string>) => {
        return stages.map((stage, index) => {
            return <MenuItem key={index} value={stage}>{stage}</MenuItem>
        });
    }

    return(
        <Box onSubmit={handleSubmit} component={'form'} sx={{ '& .MuiTextField-root': {m: 1, width: '25ch'} }}>
            <div>
                <Typography variant={'h6'}>Client Name</Typography>
                <TextField
                    required
                    id={'first-name-required'}
                    label={'First Name'}
                    defaultValue={client.firstName}
                    onChange={ e => setClient({...client, firstName: e.target.value})}
                    variant={'filled'}
                />
                <TextField
                    required
                    id={'last-name-required'}
                    label={'Last Name'}
                    defaultValue={client.lastName}
                    onChange={ e => setClient({...client, lastName: e.target.value})}
                    variant={'filled'}
                />
            </div>
            <div>
                <Typography variant={'h6'}>Client Contact</Typography>
                <TextField
                    required
                    id={'email-required'}
                    label={'Email'}
                    defaultValue={client.email}
                    onChange={ e => setClient({...client, email: e.target.value })}
                    variant={'filled'}
                />
                <TextField
                    id={'phone-number'}
                    label={'Phone'}
                    defaultValue={client.phone}
                    onChange={ e => setClient({ ...client, phone: e.target.value})}
                    variant={'filled'}
                />
                <TextField
                    id={'company'}
                    label={'Company'}
                    defaultValue={client.company}
                    onChange={ e => setClient({...client, company: e.target.value})}
                    variant={'filled'}
                />
            </div>
            <div>
                <Typography variant={'h6'}>Client Viability</Typography>
                <TextField
                    required
                    id={'client-stage'}
                    label={'Client Probability'}
                    defaultValue={client.probability}
                    onChange={ e => setClient({ ...client, probability: parseInt(e.target.value)})}
                    variant={'filled'}
                />
                <FormControl sx={{ width: '50%', marginTop: '8px'}}>
                    <InputLabel id={'stage-select-label'}>Stage</InputLabel>
                    <Select
                        labelId={'stage-select-label'}
                        id={'stage-select'}
                        value={client.stage}
                        label={'Stage'}
                        onChange={e => setClient({...client, stage: e.target.value})}
                        variant={'filled'}
                    >
                        {showStageValues(stages)}
                    </Select>
                </FormControl>
            </div>
            <Button type={'submit'} sx={{marginTop: '10px', marginBottom: '0px'}} onSubmit={handleSubmit} variant={'contained'}>Submit</Button>
        </Box>
    );
}

export default ModalForm