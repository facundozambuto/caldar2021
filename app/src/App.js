import { connect } from 'react-redux';
import { Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import history from './_helpers/history';
import {PrivateRoute} from './components'
import {Technicians} from './Technicians';
import {Auth} from './auth'
import './app.css';
import {authActions} from './_actions';
import React, { Component } from 'react';

class App extends Component {

    constructor(props) {
        super(props);

        const user = localStorage.getItem('user');
        if (user) {
            this.props.confirmLogin(user);
        }
    }

    render() {
        const {authReducer} = this.props

        return (
           <Router history={history}>
               <Route path="/auth" component={Auth}  />
               <PrivateRoute exat path="/" component={Technicians} auth={authReducer.auth} />
           </Router>
        )
    }
}

function mapStateToProps(state) {
    const {authReducer} = state;
    return {authReducer}
}

const actionCreator = {
    confirmLogin: authActions.confirmLogin
}

const appComponent = connect(mapStateToProps, actionCreator)(App);
export {appComponent as App}