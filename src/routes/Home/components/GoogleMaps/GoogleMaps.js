import React, {Component, PropTypes} from 'react'
import GoogleMap from 'google-map-react'
import ForHireMarker from './ForHireMarker'
import request from 'superagent'
import _ from 'lodash'
class GoogleMaps extends Component {
//     static defaultProps = {
//     center: {lat: 7.171867972270803, lng: 125.4609276905212},
//     zoom: 15,
//     // greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
//   }

//   constructor(props) {
//     // super(props);
//   }

  onClickMap = (val) => {
      console.log(val)
      let {lat, lng} = val
     request
      .get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true`)
      .end((err, res) => {
        if (err || !res.ok) {
          console.log('shit')
        } else {
          console.log(res.body.results[0].address_components[1].short_name)
        }
      })
  }
    render () {
        let {nearby } = this.props.home.toJS()
       
        let nearbyMarker = null
        if (nearby) {
            nearbyMarker = _.map(nearby, profile => {
               let{id, lat , lng } =  profile
               return (
                   <ForHireMarker lat={lat} lng={lng} {...profile} key={id} />
               )
            })
        }
        return (
            <GoogleMap onClick={this.onClickMap}
                defaultCenter={this.props.params.center}
                defaultZoom={this.props.params.zoom}
                bootstrapURLKeys={{
                    key: "AIzaSyBN6ehvb0xUlQEbdLdX3g8_ZNguEHbm8hQ", 
                }}
                hoverDistance={50}
                >
                {nearbyMarker && nearbyMarker}
               
            </GoogleMap>
        )
    }
}

GoogleMaps.propTypes = {

}

export default GoogleMaps