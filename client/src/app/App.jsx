import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../helpers';
import { alertActions } from '../actions';
import { PrivateRoute } from '../containers';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { CountriesPage } from '../pages/CountryPage';


class App extends React.Component {
    constructor(props) {
        super(props);
        history.listen((location, action) => {
            this.props.clearAlerts();
        });
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

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };