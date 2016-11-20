// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import HomeRoute from './Home'
import LogInRoute from './Login'
/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path : '/',
  onEnter: async (nextState, replace, cb) => {
    const auth = JSON.parse(localStorage.getItem('reduxPersist:auth'))
    if (auth && auth.token && auth.token.token) {
      // const authActions = require('redux/modules/auth').actions  
      // await store.dispatch(authActions.load(auth.token.token))
    }
    cb()
  },
  component   : CoreLayout,
  indexRoute  : HomeRoute(store),
  childRoutes : [
    LogInRoute(store),
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
