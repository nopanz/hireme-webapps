import Login from './containers/LoginContainer'

// Sync route definition

export default (store) => ({
  path: 'login',
  component: Login,
//   onEnter (nextState, replace) {
//     const { auth } = store.getState()
//     if (auth && auth.loaded) {
//       const redirect = nextState.location.query.redirect || '/'
//       replace(redirect)
//     }
//   },
//   /*  Async getComponent is only invoked when route matches   */
//   getComponent (nextState, cb) {
//     /*  Webpack - use 'require.ensure' to create a split point
//         and embed an async module loader (jsonp) when bundling   */
//     require.ensure([], (require) => {
//       /*  Webpack - use require callback to define
//           dependencies for bundling   */
//       const Login = require('./containers/LoginContainer').default

//       cb(null, Login)

//     /* Webpack named bundle   */
//     }, 'login')
//   },
})
