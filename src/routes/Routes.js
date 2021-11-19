import React, { useState } from 'react';
import PrivateRoutes from './PrivateRoutes';
import { HashRouter as Router } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';

export const Validation = React.createContext();
export const Path = React.createContext();

const Routes = () => {
    const [ token, setToken ] = useState("");
    
    return(
        <Router>
            <Path.Provider value="https://jsonplaceholder.typicode.com/">
                <Validation.Provider value={{token, setToken}}>
                    {
                        token!==""&&localStorage.getItem("loginToken")===token
                        ?
                        <PrivateRoutes/>
                        :
                        <PublicRoutes/>
                    }
                </Validation.Provider>
            </Path.Provider>
        </Router>
    );

}

export default Routes;