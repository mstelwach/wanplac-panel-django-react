import React from "react";
import {ListGroup, Container} from "react-bootstrap";
import axios from "axios";
import KayakListItem from "../KayakListItem/KayakListItem";


class KayakList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kayakList: []
        }
    };

    componentDidMount() {
        this.refreshList();
    };

    refreshList() {
        axios
            .get("http://localhost:8000/api/kayaks/")
            .then(response => this.setState({kayakList: response.data}))
            .catch(error => console.log(error));
    };

    render() {
        const kayakList = this.state.kayakList;
        return (
            <Container>
                <h3 className="d-flex justify-content-center align-items-center mb-3">
                    <span className="text-muted">Lista dostępnych kajaków</span>
                </h3>
                <br />
                <ListGroup>
                    <KayakListItem
                        kayakList={kayakList}
                    />
                </ListGroup>
            </Container>
        )
    }
}

export default KayakList;