import React, {Fragment} from 'react';
import {ListGroup} from "react-bootstrap";


class ReservedKayakListItem extends React.Component {
    render() {
        const reservedKayaks = [...this.props.reservedKayaks];
        const kayakList = [...this.props.kayakList];

        return reservedKayaks.map((reservedKayak, index) => {
            const dataReservedKayak = kayakList.find(dataKayak => dataKayak.kayak.id === reservedKayak.kayak);
            return (
                <Fragment key={`${reservedKayak}~${index}`}>
                    <ListGroup.Item className="d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">{dataReservedKayak.kayak.name}</h6>
                            <small className="text-muted">Liczba kajaków: {reservedKayak.quantity}</small>
                        </div>
                        <span className="text-muted">{dataReservedKayak.kayak.price}PLN</span>
                    </ListGroup.Item>
                </Fragment>
            )
        })
    }
}

export default ReservedKayakListItem;