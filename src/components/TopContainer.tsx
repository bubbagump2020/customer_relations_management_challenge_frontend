import React from 'react';
import ClientContainer from "./views/ClientContainer";
import '../style/Table.sass';

const TopContainer:React.FC = () => {
    return(
        <div>
            <div className={'table-wrapper'}>
                <ClientContainer />
            </div>
        </div>
    )
}

export default TopContainer;