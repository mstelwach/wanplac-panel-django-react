import React from 'react';
import axios from "axios";
import {Form, Button, Modal} from "react-bootstrap";


class ReservedKayakCreateFormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kayakList: [],
            reservedKayak: {
                reservation: '',
                kayak: '',
                quantity: ''
            },
            isAddedKayak: false
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        this.updateKayakList()
    };

    updateReservedKayaks(reservedKayaks) {
        this.props.onReservedKayaksChange(reservedKayaks)
    };

    updateKayakList() {
        const selectedDate = this.props.selectedDate.toISOString().substring(0, 10);
        axios
            .get('http://127.0.0.1:8000/api/kayak-stock-date/', {
                params: {
                    date: selectedDate
                }
            })
            .then(response => this.setState({kayakList: response.data}))
            .catch(error => console.log(error))
    };

    handleSelectChange({target}) {
        const reservedKayak = this.state.reservedKayak

        if (target.name === 'reservedKayak') {
            this.setState({reservedKayak: {...reservedKayak, kayak: parseInt(target.value)}});
        }
        else if (target.name === 'quantityKayak') {
            const selectedKayak = this.state.reservedKayak.kayak
            if (selectedKayak) {
                this.setState({
                    reservedKayak: {...reservedKayak, quantity: parseInt(target.value)},
                    isAddedKayak: true
                })
            }
        }
    };

    handleSubmit() {
        const reservedKayak = this.state.reservedKayak;
        const reservedKayaks = [...this.props.reservedKayaks];
        const toggleModal = this.props.toggle;
        reservedKayaks.push(reservedKayak)
        this.updateReservedKayaks(reservedKayaks)
        toggleModal()
    };

    renderKayakOption() {
        const reservedKayaks = [...this.props.reservedKayaks];
        const kayakList = this.state.kayakList;
        return kayakList.map(data => {
            const isAddedKayak = reservedKayaks.some(reservedKayak => reservedKayak.kayak === data.kayak.id);
            return (
                <option key={data.kayak.id} value={data.kayak.id} disabled={isAddedKayak}>
                    Model: {data.kayak.name} - {data.kayak.kind} | Cena: {data.kayak.price} PLN
                </option>
            )
        })
    };

    renderQuantityOption() {
        const selectedKayak = this.state.reservedKayak.kayak;
        if (selectedKayak) {
            const dataSelectedKayak = this.state.kayakList.find(dataKayak => dataKayak.kayak.id === selectedKayak);
            const stockSelectedKayak = dataSelectedKayak.stock;
            return [...Array(stockSelectedKayak).keys()].map(number => (<option key={number+1} value={number+1}>{number+1}</option>))
        }

    };

    render() {
        const toggle = this.props.toggle;
        const isAddedKayak = this.state.isAddedKayak;
        return (
            <Modal show={true} onHide={toggle} className='modal-register'>
                <Modal.Header className='no-border-header text-center'>
                    <h6 className="text-muted">Formularz rezerwacji</h6>
                    <h3 className="modal-title text-center">Dodaj kajak</h3>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                            <Form.Group controlId='formGridKayak'>
                                <Form.Label>Kajak</Form.Label>
                                <Form.Control as='select' name='reservedKayak' onChange={this.handleSelectChange}>
                                    <option>Wybierz...</option>
                                    {this.renderKayakOption()}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='formGridQuantity'>
                                <Form.Label>Ilość</Form.Label>
                                <Form.Control as='select' name='quantityKayak' onChange={this.handleSelectChange}>>
                                    <option>Wybierz...</option>
                                    {this.renderQuantityOption()}
                                </Form.Control>
                            </Form.Group>
                            <Button block className="btn-round" color="default" onClick={this.handleSubmit} disabled={!isAddedKayak}>
                                Dodaj
                            </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ReservedKayakCreateFormModal;