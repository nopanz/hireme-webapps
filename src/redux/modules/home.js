import { CALL_API } from 'redux-api-middleware'
import Immutable from 'immutable'
import { getToken } from 'utils/auth'

export const FETCH_CATEGORY = 'hireme/home/FETCH_CATEGORY'
export const FETCH_CATEGORY_SUCCESS = 'hireme/home/FETCH_CATEGORY_SUCCESS'
export const FETCH_CATEGORY_FAIL = 'hireme/home/FETCH_CATEGORY_FAIL'
export const FETCH_NEARBY = 'hireme/home/FETCH_NEARBY'
export const FETCH_NEARBY_SUCCESS = 'hireme/home/FETCH_NEARBY_SUCCESS'
export const FETCH_NEARBY_FAIL = 'hireme/home/FETCH_NEARBY_FAIL'



export function fetchCategory (token) {
  return {
      [CALL_API]: {
        endpoint: '/api/categories',
        method:'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
    types: [FETCH_CATEGORY, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_FAIL],
    },
  }
}

export function findNearby (address, token) {
   return {
      [CALL_API]: {
        endpoint: `/api/users/nearby/${address}`,
        method:'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
    types: [FETCH_NEARBY, FETCH_NEARBY_SUCCESS, FETCH_NEARBY_FAIL],
    },
  }
}




export const actions = {
  fetchCategory,
  findNearby,
}



const ACTION_HANDLERS = {
 [FETCH_CATEGORY]: state => state.merge({
   fetchingCategories: true,
 }),
 [FETCH_CATEGORY_SUCCESS]:(state, action) => state.merge({
   fetchCategory: false,
   categories: action.payload.data,
 }),
 [FETCH_CATEGORY_FAIL]:(state, action) => state.merge({
   fetchCategory: false,
   fetchCategoryFail: true,
 }),
 [FETCH_NEARBY]: state => state.merge({
   fetchingNearby: true,
 }),
 [FETCH_NEARBY_SUCCESS]:(state, action) => state.merge({
   fetchingNearby: false,
   nearby: action.payload.data,
 }),
 [FETCH_NEARBY_FAIL]:(state, action) => state.merge({
   fetchingNearby: false,
   fetchNearbyFail: true,
 }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.fromJS({
  categories: null,
  fetchingCategories:false,
  fetchingNearby: false,
  nearby: null,
})

export default function homeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}