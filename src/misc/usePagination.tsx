import PropTypes from 'prop-types';
import React from 'react';
import Client from './Client';

const usePagination = (data:any, itemsPerPage:number) => {

    const [currentPage, setCurrentPage] = React.useState(1);
    const itemCount = data.length;
    
    const getCurrentData = ():Array<Client> => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        return data.slice(start, end);
    }

    const pageCount = Math.ceil(itemCount / itemsPerPage);

    return {
        currentPage,
        getCurrentData,
        setCurrentPage,
        pageCount
    };
};

usePagination.propTypes = {
    data: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
    itemsPerPage: PropTypes.number.isRequired
}

export default usePagination