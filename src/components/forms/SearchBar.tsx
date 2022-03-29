import { TextField } from '@mui/material';
import React from 'react';

interface ISearchBar {
    setLastName(lastName:string):void
}


const SearchBar:React.FC<ISearchBar> = ({setLastName}:ISearchBar) => {
    return(
        <TextField label={'Search By Last Name'} variant={'filled'} onChange={e => setLastName(e.target.value)} size='small' sx={{marginRight: '15px'}}/>
    );
}

export default SearchBar;