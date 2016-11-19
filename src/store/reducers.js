import { combineReducers } from 'redux'
import locationReducer from './location'
import auth from 'redux/modules/auth'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
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
