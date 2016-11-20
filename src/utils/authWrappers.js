import { UserAuthWrapper } from 'redux-auth-wrapper'

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  wrapperDisplayName: 'UserIsAuthenticated',
  predicate: auth => auth.user !== null,
  failureRedirectPath: '/login',
  allowRedirectBack: false,
})

export const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  predicate: auth => auth.user == null,
  failureRedirectPath: '/',
  allowRedirectBack: false,
})
