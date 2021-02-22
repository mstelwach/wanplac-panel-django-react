import React, {Fragment} from 'react';
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import {FaAngleRight} from "react-icons/fa";


class ReservationListItem extends React.Component {
    render() {
        const reservationList = [...this.props.reservationList]
        return reservationList.map((reservation, index) => (
            <Fragment key={`${reservation}~${index}`}>
                <ListGroup.Item>
                    <Container>
                        <Row className='p-4'>
                            <Col className='col-3 offset-xl-0' md='3' xl='2'>
                                    <div>
                                        <h6 className="my-0">{reservation.date}</h6>
                                        <small className='text-muted'>{reservation.time}</small>
                                    </div>
                            </Col>
                            <Col className='col-9 offset-0 border-left justify-content-between d-flex' sm='9' md='9' xl='10'>
                                <div>
                                    <h6 className="my-0">WanPLac Rezerwacja nr: {reservation.id} {reservation.first_name} {reservation.last_name}</h6>
                                    <small className="text-muted">Zarezerowane kajaki: </small>
                                    <br />
                                    <p className="my-0 font-weight-bold">Koszt rezerwacji: 20PLN</p>
                                </div>
                                <FaAngleRight />
                            </Col>
                        </Row>
                    </Container>
                </ListGroup.Item>
                <br />
            </Fragment>
        ))
    }
}

export default ReservationListItem;