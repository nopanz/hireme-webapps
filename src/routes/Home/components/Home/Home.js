import React, {Component, PropTypes} from 'react'
import { Grid, Form, Button, Container, Header, Icon} from 'semantic-ui-react'
import GoogleMaps from '../GoogleMaps'
import SideBar from '../SideBar'
class Home extends Component {

  componentDidMount () {
    let { auth } = this.props
    this.props.fetchCategory(auth.token)
  }

  render () {
    let { logout, auth, fetchCategory, home, findNearby} = this.props
    
    let { lat , lng } = auth.user.profile
    let { address} = auth.user
    console.log(auth)
    let gParams = {
      center: {
        lat,
        lng,
      },
      zoom: 15,
    }
    return (
      <div className="app-container">
        <Grid>
          <Grid.Row>
          <Grid.Column width={4} color="black" className="side-bar">
            <SideBar logout={logout} home={home} token={auth.token} findNearby={findNearby} address={address} />
          </Grid.Column>
          <Grid.Column width={12} className="map">
            <GoogleMaps  params={gParams} home={home} />
          </Grid.Column>
         </Grid.Row>
        </Grid>
      </div>
    )
  }
}

Home.propTypes = {

}

export default Home

