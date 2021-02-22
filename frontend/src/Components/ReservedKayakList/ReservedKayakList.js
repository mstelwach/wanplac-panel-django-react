import React from 'react';
import {Col, ListGroup} from "react-bootstrap";
import ReservedKayakListItem from "../ReservedKayakListItem/ReservedKayakListItem";

class ReservedKayakList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalCost: 0
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.reservedKayaks !== this.props.reservedKayaks) {
            this.updateTotalCost()
        }
    }

    updateTotalCost() {
        const reservedKayaks = [...this.props.reservedKayaks];
        const kayakList = [...this.props.kayakList];
        let totalCost = 0;
        reservedKayaks.forEach(reservedKayak => {
            const dataReservedKayak = kayakList.find(dataKayak => dataKayak.kayak.id === reservedKayak.kayak);
            const priceReservedKayak = dataReservedKayak.kayak.price * reservedKayak.quantity;
            totalCost += priceReservedKayak
        })

        this.setState({totalCost: totalCost})
    };

    render() {
        const reservedKayaks = [...this.props.reservedKayaks];
        const kayakList = [...this.props.kayakList];
        const totalCost = this.state.totalCost;
        const isValidatedForm = this.props.isValidatedForm;

        return (
            <Col md='4' className="order-md-2 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Twoje kajaki</span>
                    <span className="badge badge-secondary badge-pill">{reservedKayaks.length}</span>
                </h4>
                <ListGroup className="mb-3">
                    <ReservedKayakListItem
                        reservedKayaks={reservedKayaks}
                        kayakList={kayakList}
                    />
                    <ListGroup.Item className="d-flex justify-content-between">
                        <span>Total (PLN)</span>
                        <strong>{totalCost}PLN</strong>
                    </ListGroup.Item>
                    {isValidatedForm && !reservedKayaks.length && <span className='text-danger'><small>Wybierz kajak!</small></span> }
                </ListGroup>

            </Col>
        )
    }
}

export default ReservedKayakList;