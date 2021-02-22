import React from 'react';
import {Image, Modal} from "react-bootstrap";

class RouteModal extends React.Component {
    render() {
        const toggle = this.props.toggle;
        return (
            <Modal show={true} onHide={toggle} size='lg' className='modal-static'>
                <Modal.Header className='no-border-header text-center'>
                    <h3 className="text-muted modal-title text-center">Zdjęcie trasy</h3>
                </Modal.Header>
                <Modal.Body>
                    <Image
                        src={this.props.src}
                        alt={this.props.alt}
                        className='img-fluid mx-auto d-block'
                        style={{borderRadius: '3%'}}
                    />
                </Modal.Body>
            </Modal>
        );
    }
}

export default RouteModal;