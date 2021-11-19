import React from 'react';

const Container = ({children}) => {
    return(
        <div className="container-sm d-flex align-items-center flex-column">
            {children}
        </div>
    );
}

export default Container;