import axios from 'axios'

export const FETCH_FARMERS_REQUEST = 'FETCH_FARMERS_REQUEST'
export const FETCH_FARMERS_SUCCESS = 'FETCH_FARMERS_SUCCESS'
export const FETCH_FARMERS_FAILURE = 'FETCH_FARMERS_FAILURE'
export const DELETE_FARMER_REQUEST = 'DELETE_FARMER_REQUEST'
export const DELETE_FARMER_SUCCESS = 'DELETE_FARMER_SUCCESS'
export const DELETE_FARMER_FAILURE = 'DELETE_FARMER_FAILURE'
export const UPDATE_FARMER_REQUEST = 'UPDATE_FARMER_REQUEST'
export const UPDATE_FARMER_SUCCESS = 'UPDATE_FARMER_SUCCESS'
export const UPDATE_FARMER_FAILURE = 'UPDATE_FARMER_FAILURE'

export const fetchFarmersRequest = () => ({
  type: FETCH_FARMERS_REQUEST,
})

export const fetchFarmersSuccess = (farmers) => ({
  type: FETCH_FARMERS_SUCCESS,
  payload: farmers,
})

export const fetchFarmersFailure = (error) => ({
  type: FETCH_FARMERS_FAILURE,
  payload: error,
})

export const fetchFarmers = () => {
  return async (dispatch) => {
    dispatch(fetchFarmersRequest())
    try {
      const response = await axios.get('http://localhost:3001/farmers')
      dispatch(fetchFarmersSuccess(response.data))
    } catch (error) {
      dispatch(fetchFarmersFailure('Erro ao carregar produtores'))
    }
  }
}

export const deleteFarmerRequest = (id) => ({
  type: DELETE_FARMER_REQUEST,
  payload: id,
})

export const deleteFarmerSuccess = (id) => ({
  type: DELETE_FARMER_SUCCESS,
  payload: id,
})

export const deleteFarmerFailure = (error) => ({
  type: DELETE_FARMER_FAILURE,
  payload: error,
})

export const deleteFarmer = (id) => {
  return async (dispatch) => {
    dispatch(deleteFarmerRequest(id))
    try {
      const response = await axios.delete(`http://localhost:3001/farmers/${id}`)
      if (response.status === 200) {
        dispatch(deleteFarmerSuccess(id))
      }
    } catch (error) {
      dispatch(deleteFarmerFailure('Erro ao deletar produtor'))
    }
  }
}

export const updateFarmerRequest = (farmer) => ({
  type: UPDATE_FARMER_REQUEST,
  payload: farmer,
})

export const updateFarmerSuccess = (farmer) => ({
  type: UPDATE_FARMER_SUCCESS,
  payload: farmer,
})

export const updateFarmerFailure = (error) => ({
  type: UPDATE_FARMER_FAILURE,
  payload: error,
})

export const updateFarmer = (farmer) => {
  return async (dispatch) => {
    dispatch(updateFarmerRequest(farmer))
    try {
      const response = await axios.put(`http://localhost:3001/farmers/${farmer.id}`, farmer)
      if (response.status === 200) {
        dispatch(updateFarmerSuccess(response.data))
      }
    } catch (error) {
      dispatch(updateFarmerFailure('Erro ao atualizar produtor'))
    }
  }
}
