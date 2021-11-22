import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../Pages/PrivatePages/Home';
import Detail from '../Pages/PrivatePages/Detail';
import CreationForm from '../Pages/PrivatePages/CreationForm';
import EditionForm from '../Pages/PrivatePages/EditionForm';

export const PostsState = React.createContext();
export const CurrentPostState = React.createContext();

const PrivateRoutes = () => {
    const [ posts, setPosts ] = useState([]);
    const [ currentPost, setCurrentPost ] = useState({});

    return(
        <CurrentPostState.Provider value={{currentPost, setCurrentPost}}>
            <PostsState.Provider value={{posts, setPosts}}>
                <Switch>
                     <Route exact path="/" component={Home}/>
                     <Route exact path="/detail/:id" component={Detail}/>
                     <Route exact path="/detail-create" component={CreationForm}/>
                     <Route exact path="/detail-edit/:id" component={EditionForm}/>
                    {/*<Route exact path="/search" component={Search}/>
                    <Route exact path="/details/:id" component={Details}/> */}
                    <Redirect to="/"/>
                </Switch>
            </PostsState.Provider>
        </CurrentPostState.Provider>
    );
}

export default PrivateRoutes;