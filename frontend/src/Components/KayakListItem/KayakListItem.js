import React, {Fragment} from "react";
import {ListGroup} from "react-bootstrap";
import {FaChild} from "react-icons/fa";


class KayakListItem extends React.Component {

    renderKind(kind) {
        const kindList = [];
        for (let i=0; i < kind; i++) {
            kindList.push((<FaChild key={i}/>))
        }
        return kindList
    };

    render() {
        const kayakList = [...this.props.kayakList]
        return kayakList.map((kayak, index) => (
            <Fragment key={`${kayak}~${index}`}>
                <ListGroup.Item className="d-flex justify-content-between lh-condensed">
                    <div>
                        <h3 className="my-0">{kayak.name} - {this.renderKind(kayak.kind)}</h3>
                        <br />
                        <p>{kayak.description}</p>
                        <img src={kayak.image} alt={kayak.name} className='img-fluid mx-auto d-block'/>
                    </div>
                    <span className="text-muted"><strong>{kayak.price}PLN</strong></span>
                </ListGroup.Item>
                <br />
            </Fragment>
        ))
    }
}

export default KayakListItem;