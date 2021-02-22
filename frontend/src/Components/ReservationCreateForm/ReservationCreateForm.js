import React from 'react';
import './ReservationCreateForm.css';
import {Form, Col, Container, Row, Button} from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import Modal from '../ReservedKayakCreateFormModal/ReservedKayakCreateFormModal';
import ReservedKayakList from "../ReservedKayakList/ReservedKayakList";
import images from "../../assets/images";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {createReservation} from "../../actions/reservation";



class ReservationCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routeList: [],
            kayakList: [],
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
            reservedKayaks : [],
            modal: false,
            isValidatedForm: false,
        };

        this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
        this.handleTimePickerChange = this.handleTimePickerChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateReservedKayaks = this.updateReservedKayaks.bind(this)
    };

    static propTypes = {
        createReservation: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.updateRouteList();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.selectedDate !== this.state.selectedDate) {
            this.updateExcludeTime();
            this.updateKayakList()
            this.setState({reservedKayaks: []})
        }
    };

    updateKayakList() {
        const selectedDate = this.state.selectedDate.toISOString().substring(0, 10);
        axios
            .get('http://127.0.0.1:8000/api/kayak-stock-date/', {
                params: {
                    date: selectedDate
                }
            })
            .then(response => this.setState({kayakList: response.data}))
            .catch(error => console.log(error))
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
        let reservation = this.state.reservation;
        let { name, value } = e.target;
        reservation = { ...reservation, [name]: value };
        this.setState({ reservation: reservation });
    };

    handleSubmit(event) {
        const form = event.currentTarget;
        const reservedKayaks = this.state.reservedKayaks;
        if (form.checkValidity() === false || !reservedKayaks.length) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState({isValidatedForm: true});

        event.preventDefault();
        const reservation = this.state.reservation;
        this.props.createReservation(reservation)


        // this.setState({
        //     reservation:
        // })
        // const reservation = this.state.reservation;
        // axios
        //     .post("http://127.0.0.1:8000/api/reservations/", reservation)
        //     .then(response => {
        //         const reservationId = response.data.id;
        //         const reservedKayaks = this.state.reservedKayaks.map(reservedKayak => {
        //             return {...reservedKayak, reservation: reservationId}
        //         });
        //         reservedKayaks.forEach(reservedKayak => {
        //             axios
        //                 .post("http://127.0.0.1:8000/api/reserved-kayak/", reservedKayak)
        //                 .then(response => console.log(response.data))
        //                 .catch(error => console.log(error))
        //         })
        //     })
        //     .catch(error => console.log(error))
    };

    renderRouteOption() {
        const routeList = this.state.routeList;
        return routeList.map(route => (
            <option key={route.id} value={route.id}>{route.start} -> {route.end}</option>
        ))
    };

    toggleModal = () => {
        this.setState({ modal: !this.state.modal });
    };

    render() {
        const logoWanPlac = images.logoWanPlac;
        const isValidatedForm = this.state.isValidatedForm;
        return (
            <>
            <Container>
                <div className="py-5 text-center">
                    <img className="d-block mx-auto mb-4"
                         src={logoWanPlac} alt=""/>
                        <h2>Formularz rezerwacji</h2>
                        <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <Row>
                    <ReservedKayakList
                        kayakList={this.state.kayakList}
                        reservedKayaks={this.state.reservedKayaks}
                        isValidatedForm={isValidatedForm}
                    />
                    <Col md='8' className="order-md-1">
                        <h4 className="mb-3">Dane rezerwacji</h4>
                        <Form noValidate validated={isValidatedForm} autoComplete='off' onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formGridFirstName" className='mb-3'>
                                <Form.Label>Imię</Form.Label>
                                <Form.Control
                                    required
                                    name='first_name'
                                    type='text'
                                    placeholder='Imię'
                                    onChange={this.handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Podaj prawidłowe imię.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId='formGridLastName' className='mb-3'>
                                <Form.Label>Nazwisko</Form.Label>
                                <Form.Control
                                    required
                                    name='last_name'
                                    type='text'
                                    placeholder='Nazwisko'
                                    onChange={this.handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Podaj prawidłowe nazwisko.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} md='6' controlId='formGridDate' className='mb-3'>
                                    <Form.Label>Data</Form.Label>
                                    <DatePicker
                                        placeholderText='Data rezerwacji'
                                        name='date'
                                        dateFormat="yyyy/MM/dd"
                                        onChange={this.handleDatePickerChange}
                                        selected={this.state.selectedDate}
                                        className='form-control'
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Podaj prawidłową datę rezerwacji.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md='6' controlId='formGridTime' className='mb-3'>
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
                                    <Form.Control.Feedback type="invalid">
                                        Podaj prawidłową godzinę rezerwacji.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group controlId='formGridPhone' className='mb-3'>
                                <Form.Label>Telefon</Form.Label>
                                <PhoneInput
                                    inputExtraProps={{
                                        name: "phone",
                                        required: true,
                                        autoFocus: true,
                                    }}
                                    country={'pl'}
                                    preferredCountries={['pl', 'de', 'gb']}
                                    placeholder='Numer kontaktowy'
                                    value={this.state.reservation.phone}
                                    onChange={phone => this.setState({ reservation:  {...this.state.reservation, phone: phone}})}
                                    inputStyle={{width: '100%'}}
                                    specialLabel=''
                                    enableSearch={true}
                                    searchPlaceholder='Szukaj'
                                    searchNotFound='Nie znaleziono kraju'
                                    copyNumbersOnly={false}
                                    isValid={(value, country) => {
                                        if (value.match(/12345/)) {
                                            return (
                                                <Form.Control.Feedback type="invalid">
                                                    Nieprawidłowy numer: {value}, {country.name}
                                                </Form.Control.Feedback>
                                            )
                                            // return 'Invalid value: '+value+', '+country.name;
                                        } else return !value.match(/1234/);
                                    }}
                                />
                                {/*<Form.Control.Feedback type="invalid">*/}
                                {/*    Podaj prawidłowy numer kontaktowy*/}
                                {/*</Form.Control.Feedback>*/}
                            </Form.Group>
                            <Form.Group controlId="formGridRoute" className='mb-3'>
                                <Form.Label>Trasa</Form.Label>
                                <Form.Control as="select" required name='route' onChange={this.handleInputChange}>
                                    <option value=''>Wybierz...</option>
                                    {this.renderRouteOption()}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Wybierz prawidłową trasę.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <hr className="mb-4" />
                            <Button
                                variant='primary'
                                onClick={() => this.setState({modal: !this.state.modal})}
                                disabled={!this.state.selectedDate}
                            >
                              Dodaj kajak
                            </Button>
                            <hr className="mb-4" />
                            <Button variant='primary' size='lg' block type='submit'>
                                Zarezerwuj
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
                {this.state.modal && (
                  <Modal
                      selectedDate={this.state.selectedDate}
                      onReservedKayaksChange={this.updateReservedKayaks}
                      reservedKayaks={this.state.reservedKayaks}
                      toggle={this.toggleModal}
                  />
                  )}
            </>
        )
    }
}

// export default ReservationCreateForm;
export default connect(null, {createReservation})(ReservationCreateForm);