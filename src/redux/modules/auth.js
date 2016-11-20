import { CALL_API } from 'redux-api-middleware'
import { REHYDRATE } from 'redux-persist/constants'


export const LOGIN = 'hireme/auth/LOGIN'
export const LOGIN_SUCCESS = 'hireme/auth/LOGIN_SUCCESS'
export const LOGIN_FAIL = 'hireme/auth/LOGIN_FAIL'
export const LOAD_USER = 'hireme/auth/LOAD_USER'
export const LOGOUT = 'hireme/auth/LOGOUT'

export function logout () {
  return async (dispatch) => {
    await dispatch({
      type: LOGOUT,
    })
    window.location = '/login'
    localStorage.removeItem('reduxPersist:auth')
  }
}

export function load (auth) {
  return (dispatch, getState) => {
    return dispatch ({
      type:LOAD_USER,
      auth,
    })
  }
}

export function login (username, password) {
  return {
    [CALL_API]: {
      endpoint: '/api/auth/access-token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
      types: [
        LOGIN,
        {
          type: LOGIN_SUCCESS,
          payload: (action, state, res) => res.json(),
          meta: {
            done: true,
            transition: {
              success: (prevState) => ({
                pathname: '/',
              }),
            },
          },
        },
        LOGIN_FAIL,
      ]
    }
  }
}


export const actions = {
  login,
  logout,
}



const ACTION_HANDLERS = {
  [REHYDRATE]: (state, action) => {
    const incoming = action.payload.auth
    return {
      ...state,
      token: (incoming && incoming.token) ? incoming.token : null,
      user: (incoming && incoming.user) ? incoming.user : null,
    }
  },
  [LOAD_USER]: (state, action) => ({
    ...state,
    loading: false,
    user: action.auth.user,
    loaded: true,
    token: action.auth.token,
  }),
  [LOGIN]: (state) => ({
    ...state,
    loggingIn: true,
  }),
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    loggingIn: false,
    token: action.payload.data.token,
    user: action.payload.data.user,
    loaded: true,
  }),
  [LOGIN_FAIL]: (state) => ({
    ...state,
    loggingIn: false,
    token: null,
  }),
  [LOGOUT]: state => ({
    ...state,
    loaded: false,
    user: null,
    loggingIn: false,
    token: null,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loaded: false,
  user: null,
  loggingIn: false,
  token: null,
}

export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}