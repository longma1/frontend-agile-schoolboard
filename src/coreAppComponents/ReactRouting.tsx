import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AgileBoardComponent from '../agileBoardComponents/AgileBoardComponent';

const reactRouting = () => (
    <Switch>
        <Route exact path="/">
            Home
        </Route>
        <Route path="/board">
            <AgileBoardComponent />
        </Route>
    </Switch>
)


export default reactRouting()