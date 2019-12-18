import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../helpers';
import { PrivateRoute } from '../containers';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { CountriesPage } from '../pages/CountryPage';


export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path="/" component={CountriesPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                    </Switch>
                </Router>
            </div>
        );
    }
}
