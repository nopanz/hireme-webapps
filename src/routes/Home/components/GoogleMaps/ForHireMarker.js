import React, {Component, PropTypes} from 'react'
import { Grid, Form, Button, Container, Header, Icon, Popup, Card, Image} from 'semantic-ui-react'
class ForHireMarker extends Component {
    render () {
        console.log(this.props)
        let {firstName, lastName, experience} = this.props
        return (
            <div className='hover-marker' >
             <Popup
                trigger={<Icon circular inverted color='teal' name='spy' size='large' />}
                flowing
                hoverable
                positioning='left'
            >
               <Card.Group>
                <Card>
                <Card.Content>
                    <Image floated='right' size='mini' src='http://semantic-ui.com/images/avatar/large/steve.jpg' />
                    <Card.Header>
                   {firstName} {lastName}
                    </Card.Header>
                    <Card.Meta>
                    Computer Technician
                    </Card.Meta>
                    <Card.Description>
                    {experience}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                    <Button basic color='green'>Message</Button>
                    <Button basic color='blue'>Hire</Button>
                    </div>
                </Card.Content>
                </Card>
              </Card.Group>
            </Popup>
                
            </div>
        )
    }
}

ForHireMarker.propTypes = {

}

export default ForHireMarker