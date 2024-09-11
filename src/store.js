import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import farmersReducer from './reducers/farmerReducer'
import { thunk } from 'redux-thunk'

const initialState = {
  sidebarShow: true,
  theme: 'light',
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  changeState,
  farmers: farmersReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
