import React, {Fragment} from 'react';
import {Form, Col, Button} from "react-bootstrap";
import axios from "axios";

class ReservedKayakFormSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kayakList: [],
            addedKayaks: [false]
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleAddFields = this.handleAddFields.bind(this);
        this.handleRemoveFields = this.handleRemoveFields.bind(this);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.selectedDate !== this.props.selectedDate) {
            this.updateKayakList()
        }
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

    handleSelectChange(index, event) {
        const reservedKayaks = [...this.props.reservedKayaks];
        if (event.target.name === 'reservedKayak') {
            reservedKayaks[index].kayak = parseInt(event.target.value)
        }
        else if (event.target.name === 'quantityKayak') {
            reservedKayaks[index].quantity = parseInt(event.target.value)
        }

        this.updateReservedKayaks(reservedKayaks)
    };

    handleAddFields(index) {
        this.toggleKayak(index);
        const reservedKayaks = [...this.props.reservedKayaks];
        reservedKayaks.push({reservation: '', kayak: '', quantity: ''});
        this.updateReservedKayaks(reservedKayaks)
    };

    handleRemoveFields(index) {
        this.toggleKayak(index);
        const reservedKayaks = [...this.props.reservedKayaks];
        reservedKayaks.splice(index, 1);
        this.updateReservedKayaks(reservedKayaks)
    };

    toggleKayak(index) {
        const addedKayaks = this.state.addedKayaks;
        addedKayaks[index] = !addedKayaks[index];

        const isRemovedKayak = addedKayaks[index];
        if (!isRemovedKayak) {
            addedKayaks.splice(index, 1)
        }

        this.setState({addedKayaks: addedKayaks})
    };

    renderKayakOption() {
        const kayakList = this.state.kayakList;
        return kayakList.map(data => (
            <option key={data.kayak.id} value={data.kayak.id}>
                Model: {data.kayak.name} - {data.kayak.kind} | Cena: {data.kayak.price} PLN
            </option>
        ))
    };

    renderQuantityOption(index) {
        const reservedKayaks = [...this.props.reservedKayaks];
        const selectedKayakId = reservedKayaks[index].kayak;
        if (reservedKayaks[index] && selectedKayakId) {
            const dataSelectedKayak = this.state.kayakList.find(dataKayak => dataKayak.kayak.id === selectedKayakId);
            const stockSelectedKayak = dataSelectedKayak.stock;
            return [...Array(stockSelectedKayak).keys()].map(number => (<option key={number+1} value={number+1}>{number+1}</option>))
        }
    };

    renderButton(index) {
        const reservedKayaks = [...this.props.reservedKayaks];
        const addedKayaks = this.state.addedKayaks;
        let isAddedKayak = addedKayaks[index];

        if (reservedKayaks.length === 1) {
            isAddedKayak = false
        }

        if (isAddedKayak) {
            return <Button className='btn-block' onClick={() => this.handleRemoveFields(index)}>-</Button>
        } else {
            return <Button className='btn-block' onClick={() => this.handleAddFields(index)}>+</Button>
        }
    };

    render() {
        const reservedKayaks = [...this.props.reservedKayaks];
        return (
            <>
                {reservedKayaks.map((reservedKayak, index) => (
                    <Fragment key={`${reservedKayak}~${index}`}>
                        <Form.Row className='row no-margin'>
                            <Form.Group as={Col} controlId='formGridKayak'>
                                <Form.Label>Kajak</Form.Label>
                                <Form.Control as='select' value={reservedKayak.kayak} name='reservedKayak' onChange={event => this.handleSelectChange(index, event)}>
                                    <option>Wybierz...</option>
                                    {this.renderKayakOption()}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId='formGridQuantity'>
                                <Form.Label>Ilość</Form.Label>
                                <Form.Control as='select' value={reservedKayak.quantity} name='quantityKayak' onChange={event => this.handleSelectChange(index, event)}>>
                                    <option>Wybierz...</option>
                                    {this.renderQuantityOption(index)}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><br/></Form.Label>
                                {this.renderButton(index)}
                            </Form.Group>
                        </Form.Row>
                    </Fragment>
                ))}
            </>
        )
    }
}

export default ReservedKayakFormSet;