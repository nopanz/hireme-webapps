import React, {Component, PropTypes} from 'react'
import { Grid, Form, Button, Container, Header, Icon} from 'semantic-ui-react'
import _ from 'lodash'
class SideBar extends Component {

    onLogout = () => {
        this.props.logout()
    }

    onSearch = () => {
        let {token, address } = this.props
        this.props.findNearby(address, token)
    }


    render () {
        console.log(this.props.home.toJS())
        let {categories} = this.props.home.toJS()

        let cat = _.map(categories,function (val) {
            let { name, id } = val
            return ({
                text: name,
                value: id,
            })
        })

        return (
            <Container >
                <Grid columns={2} >
                 <Grid.Row>
                    <Grid.Column>
                      
                    </Grid.Column>
                    <Grid.Column>
                       <Button color='blue' onClick={this.onLogout} >Logout</Button>
                    </Grid.Column>
                 </Grid.Row>
                </Grid>
                <Grid.Row className='padd' >
                     <Form.Select label='Job Category' name='gender' options={cat} placeholder='Category' />
                </Grid.Row>
                <Grid.Row className='padd' >
                    <Form.Input name='search' placeholder='Search Services' />
                </Grid.Row>
                <Grid.Row className='padd'>
                    <Button color='blue' onClick={this.onSearch}>Search</Button>
                </Grid.Row>
            </Container>
        )
    }
}

SideBar.propTypes = {

}

export default SideBar