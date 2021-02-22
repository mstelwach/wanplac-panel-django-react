import {CREATE_RESERVATION, GET_RESERVATIONS} from "./types";
import axios from "axios";
import {createMessage, returnErrors} from "./messages";

// GET RESERVATIONS
export const getReservations = () => (dispatch, getState) => {
    axios
        .get("http://127.0.0.1:8000/api/reservations/")
        .then(response => {
            dispatch({
                type: GET_RESERVATIONS,
                payload: response.data
            })
        })
        .catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
};

// CREATE RESERVATION
export const createReservation = (reservation) => (dispatch, getState) => {
    axios
        .post("http://127.0.0.1:8000/api/reservations/", reservation)
        .then(response => {
            dispatch(createMessage({createReservation: 'Reservation Created'}))
            dispatch({
                type: CREATE_RESERVATION,
                payload: response.data
            })
        })
        .catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
}
// // GET LEADS
// export const getLeads = () => (dispatch, getState) => {
//   axios
//     .get('/api/leads/', tokenConfig(getState))
//     .then((res) => {
//       dispatch({
//         type: GET_LEADS,
//         payload: res.data,
//       });
//     })
//     .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
// };
//
// // DELETE LEAD
// export const deleteLead = (id) => (dispatch, getState) => {
//   axios
//     .delete(`/api/leads/${id}/`, tokenConfig(getState))
//     .then((res) => {
//       dispatch(createMessage({ deleteLead: 'Lead Deleted' }));
//       dispatch({
//         type: DELETE_LEAD,
//         payload: id,
//       });
//     })
//     .catch((err) => console.log(err));
// };
//
// // ADD LEAD
// export const addLead = (lead) => (dispatch, getState) => {
//   axios
//     .post('/api/leads/', lead, tokenConfig(getState))
//     .then((res) => {
//       dispatch(createMessage({ addLead: 'Lead Added' }));
//       dispatch({
//         type: ADD_LEAD,
//         payload: res.data,
//       });
//     })
//     .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
// };