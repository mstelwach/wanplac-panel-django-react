import React from 'react';
import {ListGroup, Container} from "react-bootstrap";
import axios from "axios";
import ReservationListItem from "../ReservationListItem/ReservationListItem";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getReservations} from "../../actions/reservation";

class ReservationList extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         reservationList: []
    //     }
    // };
    static propTypes = {
        reservations: PropTypes.array.isRequired
    }

    componentDidMount() {
        this.props.getReservations();
    };

    // refreshList() {
    //     axios
    //         .get("http://localhost:8000/api/reservations/")
    //         .then(response => this.setState({reservationList: response.data}))
    //         .catch(error => console.log(error))
    // };

    render() {
        const reservationList = this.props.reservations;
        return (
            <Container>
                <h3 className="d-flex justify-content-center align-items-center mb-3">
                    <span className="text-muted">Twoje rezerwacje</span>
                </h3>
                <ListGroup className="mb-4">
                    <ReservationListItem
                        reservationList={reservationList}
                    />
                </ListGroup>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    reservations: state.reservations.reservations
})
export default connect(mapStateToProps, {getReservations})(ReservationList);