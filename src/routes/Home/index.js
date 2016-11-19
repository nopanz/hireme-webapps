import Home from './containers/HomeContainer'
import { UserIsAuthenticated } from 'utils/authWrappers'
// Sync route definition

export default (store) => ({
  component: UserIsAuthenticated(Home),
})
