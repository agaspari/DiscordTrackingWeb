import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import Main from './pages/Main';
import Guild from './pages/Guild';
import User from './pages/User';

export const AppRouter = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/guild/:guildId" component={Guild} />
                <Route path="/user/:guildId/:userId" component={User} />
            </Switch>
        </Router>
    );
};

export const history = createBrowserHistory({forceRefresh:true})

export default AppRouter;