import React, {Fragment} from "react";
import {Button, ListGroup} from "react-bootstrap";
import RouteModal from "../RouteModal/RouteModal";


class RouteListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    };

    toggleModal = () => {
        this.setState({ modal: !this.state.modal });
    };

    render() {
        const routeList = [...this.props.routeList];
        return routeList.map((route, index) => (
            <Fragment key={`${route}~${index}`}>
                <ListGroup.Item className="d-flex justify-content-between lh-condensed">
                    <div>
                        <h3 className="my-0">
                            <span>{route.start} --> {route.end}</span>
                            <Button variant='link' onClick={() => this.setState({modal: !this.state.modal})}>Pokaż trasę</Button>
                        </h3>

                        <br />
                        <p>{route.description}</p>
                        {this.state.modal && (
                            <RouteModal
                                src={route.image}
                                alt={route.start}
                                toggle={this.toggleModal}
                            />
                        )}
                    </div>
                    <span className="text-muted"><strong>{route.length}KM</strong></span>
                </ListGroup.Item>
                <br />
            </Fragment>
        ))
    }
}

export default RouteListItem;