import { CALL_API } from 'redux-api-middleware'
import { REHYDRATE } from 'redux-persist/constants'


export const LOGIN = 'hireme/auth/LOGIN'
export const LOGIN_SUCCESS = 'hireme/auth/LOGIN_SUCCESS'
export const LOGIN_FAIL = 'hireme/auth/LOGIN_FAIL'




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
                pathname: prevState.router.locationBeforeTransitions.query.redirect || '/dashboard',
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
}



const ACTION_HANDLERS = {
  [REHYDRATE]: (state, action) => {
    const incoming = action.payload.auth
    return {
      ...state,
      token: (incoming && incoming.token) ? incoming.token : null,
    }
  },
  // [LOAD]: state => ({
  //   ...state,
  //   loading: true,
  // }),
  // [LOAD_SUCCESS]: (state, action) => ({
  //   ...state,
  //   loading: false,
  //   user: action.payload,
  //   loaded: true,
  //   error: null,
  // }),
  // [LOAD_FAIL]: (state, action) => ({
  //   ...state,
  //   loading: false,
  //   user: null,
  //   loaded: false,
  //   token: null,  // clear token on failure
  //   error: action.payload,
  // }),
  [LOGIN]: (state) => ({
    ...state,
    loggingIn: true,
  }),
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    loggingIn: false,
    token: action.payload,
  }),
  [LOGIN_FAIL]: (state) => ({
    ...state,
    loggingIn: false,
    token: null,
  }),
  // [LOGOUT]: state => ({
  //   ...state,
  //   loggingOut: true,
  // }),
  // [LOGOUT_SUCCESS]: state => ({
  //   ...state,
  //   loggingOut: false,
  //   token: null,
  // }),
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