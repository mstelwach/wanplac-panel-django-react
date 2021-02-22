import React from "react";
import axios from "axios";
import {Container, ListGroup} from "react-bootstrap";
import RouteListItem from "../RouteListItem/RouteListItem";



class RouteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routeList: []
        }
    };

    componentDidMount() {
        this.refreshList();
    };

    refreshList() {
        axios
            .get("http://localhost:8000/api/routes/")
            .then(response => this.setState({routeList: response.data}))
            .catch(error => console.log(error))
    };

    render() {
        const routeList = this.state.routeList;
        return (
            <Container>
                <h3 className="d-flex justify-content-center align-items-center mb-3">
                    <span className="text-muted">Lista dostępnych tras</span>
                </h3>
                <br />
                <ListGroup>
                    <RouteListItem
                        routeList={routeList}
                    />
                </ListGroup>
            </Container>
        )
    }
}

export default RouteList;