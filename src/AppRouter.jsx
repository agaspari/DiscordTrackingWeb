import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from './pages/Main';
import Guild from './pages/Guild';
import User from './pages/User';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Route exact path="/" component={Main} />
                <Route exact path="/guild/:guildId" component={Guild} />
                <Route path="/user/:guildId/:userId" component={User} />
            </div>
        </Router>
    );
};

export default AppRouter;