import React from 'react';
import Search from "./search";
import Saved from "./saved";
import {Switch, Route} from 'react-router-dom';

const NavTabs = () => {
    return(
        <Switch>
            <Route exact path="/" component={Search}></Route>
            <Route exact path="/search" component={Search}></Route>
            <Route exact path="/saved" component={Saved}></Route>
        </Switch>
    );
}

export default NavTabs;