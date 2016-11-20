import { combineReducers } from 'redux'
import locationReducer from './location'
import auth from 'redux/modules/auth'
import home from 'redux/modules/home'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    home,
    auth,
    location: locationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
