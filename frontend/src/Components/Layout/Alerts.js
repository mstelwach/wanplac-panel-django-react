import React, { Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends React.Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { error, alert, message } = this.props;

        if (error !== prevProps.error) {
            if (error.msg.first_name) alert.error('Imię: Pole nie może być puste.');
            if (error.msg.last_name) alert.error('Nazwisko: Pole nie może być puste.');
            if (error.msg.phone) alert.error('Telefon: Pole nie może być puste.');
            if (error.msg.date) alert.error('Data: Zły format. Poprawny format: YY/MM/DD');
            if (error.msg.time) alert.error('Godzina: Zły format. Poprawny format: HH:MM');
            if (error.msg.route) alert.error('Trasa: Pole nie może być puste.');
            if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
        }

        if (message !== prevProps.message) {
            if (message.createReservation) alert.success(message.createReservation);
            // if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
        }
    }

    render() {
        return <Fragment />
    }
}


const mapStateToProps = (state) => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert(Alerts));