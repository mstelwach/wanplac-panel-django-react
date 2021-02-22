import {CREATE_RESERVATION, GET_RESERVATIONS} from "../actions/types";

const initialState = {
  reservations: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RESERVATIONS:
      return {
        ...state,
        reservations: action.payload
      };
    case CREATE_RESERVATION:
      return {
        ...state,
        reservations: [...state.reservations, action.payload]
      }
    default:
      return state
  }
}
//     case DELETE_LEAD:
//       return {
//         ...state,
//         leads: state.leads.filter((lead) => lead.id !== action.payload),
//       };
//     case CLEAR_LEADS:
//       return {
//         ...state,
//         leads: [],
//       };
