import React from 'react';
import './ReservationCreateForm.css'
import {Form, Col, Button, Container} from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import { withRouter } from 'react-router';
import ReservedKayakList from "../ReservedKayakList/ReservedKayakList";
import images from "../../assets/images";



class ReservationCreateAlternative extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routeList: [],
            selectedDate: '',
            selectedTime: '',
            excludeTime: [],
            reservation: {
                first_name: '',
                last_name: '',
                phone: '',
                date: '',
                time: '',
                route: '',
                account: 1,

            },
            reservedKayaks : [
                {
                    reservation: '',
                    kayak: '',
                    quantity: ''
                }
            ],
        };

        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleTimePickerChange = this.handleTimePickerChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateReservedKayaks = this.updateReservedKayaks.bind(this)
    };

    componentDidMount() {
        this.updateRouteList();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.selectedDate !== this.state.selectedDate) {
            this.updateExcludeTime()
        }
    };

    updateRouteList() {
        axios
            .get("http://localhost:8000/api/routes/")
            .then(response => this.setState({routeList: response.data}))
            .catch(error => console.log(error))
    };

    updateExcludeTime() {
        const selectedDate = this.state.selectedDate.toISOString().substring(0, 10);
        axios
            .get('http://127.0.0.1:8000/api/reservations/', {
                params: {
                    date: selectedDate
                }
            })
            .then(response => {
                const excludeTime = [];
                const reservationList = response.data;
                reservationList.forEach(reservation => {
                    const time = reservation.time.split(':');
                    const newDate = new Date();
                    const [hour, minutes, seconds] = time;
                    excludeTime.push(newDate.setHours(parseInt(hour), parseInt(minutes)))
                })
                this.setState({excludeTime: excludeTime})
            })
            .catch(error => console.log(error))
    };

    updateReservedKayaks(reservedKayaks) {
        this.setState({reservedKayaks: reservedKayaks})
    };

    handleDatePickerChange(datetime) {
        const reservation = this.state.reservation;
        const toDate = datetime.toISOString().substring(0, 10);
        const reservedKayaks = [...this.state.reservedKayaks];

        if (reservedKayaks) {
            this.setState({reservedKayaks: [{reservation: '', kayak: '', quantity: ''}]})
        }

        this.setState({
            selectedDate: datetime,
            reservation: {...reservation, date: toDate}
        })
    };

    handleTimePickerChange(datetime) {
        const reservation = this.state.reservation;
        const toTime = datetime.toLocaleTimeString('pl-PL');

        this.setState({
            selectedTime: datetime,
            reservation: {...reservation, time: toTime}
        })
    };

    handleInputChange(e) {
        let { name, value } = e.target;
        const reservation = { ...this.state.reservation, [name]: value };
        this.setState({ reservation: reservation });
    };

    handleSubmit(e) {
        e.preventDefault();
        this.props.history.push('/reservation/list');
        const reservation = this.state.reservation;
        axios
            .post("http://127.0.0.1:8000/api/reservations/", reservation)
            .then(response => {
                const reservationId = response.data.id;
                const reservedKayaks = this.state.reservedKayaks.map(reservedKayak => {
                    return {...reservedKayak, reservation: reservationId}
                });
                reservedKayaks.forEach(reservedKayak => {
                    axios
                        .post("http://127.0.0.1:8000/api/reserved-kayak/", reservedKayak)
                        .then(response => console.log(response.data))
                        .catch(error => console.log(error))
                })
            })
            .catch(error => console.log(error))
    };

    renderRouteOption() {
        const routeList = this.state.routeList;
        return routeList.map(route => (
            <option key={route.id} value={route.id}>{route.start} -> {route.end}</option>
        ))
    };

    render() {
        const logoWanPlac = images.logoWanPlac;
        return (
            <Container>
                <div className="py-5 text-center">
                    <img className="d-block mx-auto mb-4"
                         src={logoWanPlac} alt=""/>
                        <h2>Formularz rezerwacji</h2>
                        <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>

                <Form autoComplete='off' onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formGridFirstName">
                        <Form.Label>Imię</Form.Label>
                        <Form.Control
                            required
                            name='first_name'
                            type='text'
                            placeholder='Imię'
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId='formGridLastName'>
                        <Form.Label>Nazwisko</Form.Label>
                        <Form.Control
                            required
                            name='last_name'
                            type='text'
                            placeholder='Nazwisko'
                            onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} controlId='formGridDate'>
                            <Form.Label>Data</Form.Label>
                            <DatePicker
                                placeholderText='Data rezerwacji'
                                name='date'
                                dateFormat="yyyy/MM/dd"
                                onChange={this.handleDatePickerChange}
                                selected={this.state.selectedDate}
                                className='form-control'
                                // locale="pl"
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId='formGridTime'>
                            <Form.Label>Godzina</Form.Label>
                            <DatePicker
                                placeholderText='Godzina rezerwacji'
                                timeCaption="Godzina"
                                name='time'
                                timeFormat="HH:mm"
                                dateFormat="HH:mm"
                                onChange={this.handleTimePickerChange}
                                selected={this.state.selectedTime}
                                showTimeSelect
                                showTimeSelectOnly
                                minTime={new Date().setHours(9, 0)}
                                maxTime={new Date().setHours(12, 0)}
                                excludeTimes={this.state.excludeTime}
                                timeIntervals={30}
                                className='form-control'
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId='formGridPhone'>
                            <Form.Label>Telefon</Form.Label>
                            <Form.Control
                                required
                                name='phone'
                                type='text'
                                placeholder='Numer kontaktowy'
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridRoute">
                            <Form.Label>Trasa</Form.Label>
                            <Form.Control as="select" defaultValue="Wybierz..." name='route' onChange={this.handleInputChange}>
                                <option>Wybierz...</option>
                                {this.renderRouteOption()}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <ReservedKayakList
                        selectedDate={this.state.selectedDate}
                        onReservedKayaksChange={this.updateReservedKayaks}
                        reservedKayaks={this.state.reservedKayaks}
                    />
                    <Form.Group>
                        <Button variant='primary' type='submit'>Zapłać</Button>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}

// export default ReservationCreateAlternative;
export default withRouter(ReservationCreateAlternative);