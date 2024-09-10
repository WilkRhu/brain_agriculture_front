import { legacy_createStore as createStore, combineReducers } from 'redux'
import producersReducer from './store/producersSlice'

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
  producers: producersReducer,
})

const store = createStore(rootReducer)

export default store
