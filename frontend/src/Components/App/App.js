import React, {Fragment} from 'react';
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Navigation from "../Navigation/Navigation";
import Home from "../Home/Home";
import KayakList from "../KayakList/KayakList";
import RouteList from "../RouteList/RouteList";
import ReservationList from "../ReservationList/ReservationList";
import ReservationCreateForm from "../ReservationCreateForm/ReservationCreateForm";
import {Provider} from "react-redux";
import {Provider as AlertProvider} from 'react-alert';
import store from "../../store";
import {Alerts} from "../Layout/Alerts";
import AlertTemplate from "react-alert-template-basic";


const alertOptions = {
    timeout: 3000,
    position: 'top center'
}


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Fragment>
                        <Navigation />
                        <Alerts />
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="/kayak/list">
                                <KayakList />
                            </Route>
                            <Route path='/route/list'>
                                <RouteList />
                            </Route>
                            <Route path='/reservation/list'>
                                <ReservationList />
                            </Route>
                            <Route path='/reservation/create'>
                                <ReservationCreateForm />
                            </Route>
                        </Switch>
                    </Fragment>
                </AlertProvider>
            </Provider>
        )
    }
}

export default App;