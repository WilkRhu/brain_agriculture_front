import {
  FETCH_FARMERS_FAILURE,
  FETCH_FARMERS_REQUEST,
  FETCH_FARMERS_SUCCESS,
  DELETE_FARMER_REQUEST,
  DELETE_FARMER_SUCCESS,
  DELETE_FARMER_FAILURE,
  UPDATE_FARMER_REQUEST,
  UPDATE_FARMER_SUCCESS,
  UPDATE_FARMER_FAILURE,
} from '../actions/farmerActions'

const initialState = {
  data: [],
  loading: false,
  error: null,
}

const farmersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FARMERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_FARMERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    case FETCH_FARMERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case DELETE_FARMER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case DELETE_FARMER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter((farmer) => farmer.id !== action.payload),
      }
    case DELETE_FARMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case UPDATE_FARMER_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case UPDATE_FARMER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map((farmer) =>
          farmer.id === action.payload.id ? action.payload : farmer,
        ),
      }
    case UPDATE_FARMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default farmersReducer
