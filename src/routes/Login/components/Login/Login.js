import React, {Component, PropTypes} from 'react'
import { Grid, Form, Button, Container, Header, Icon} from 'semantic-ui-react'

const HeaderContent = Header.Content
const FormField = Form.Field
const GridRow = Grid.Row

class Login extends Component {

  state = {
    username: '',
    password: '',
  }

  handleInput = e => {
    let {name, value} = e.target
    let { username, password } = this.state
    switch (name) {
      case 'username':
        username = value
        break;
      case 'password':
        password = value
        break
      default:
        break;
    }

    this.setState({
      username,
      password,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    let {username, password } = this.state
    this.props.login(username, password)
  }

  render () {
    let { username, password } = this.state
    return (
     <div>
      <div className="sign-in container">
        <Container>
          <GridRow>
            <Header as='h1' icon textAlign='center'>
              <Icon name='spy' color='white' circular />
              <HeaderContent>
                HIRE ME
              </HeaderContent>  
            </Header>
          </GridRow> 
          <Form>
            <FormField>
              <input placeholder='Username' onChange={this.handleInput} name='username' value={username}  />
            </FormField>
            <FormField>
              <input  type='password' placeholder='Password' onChange={this.handleInput} name='password' value={password} />
            </FormField>
          <Button primary onClick={this.handleSubmit} >Sign In</Button>
          </Form> 
        </Container>
      </div>
    </div>
    )
  }
}

Login.propTypes = {
  auth: PropTypes.object,
  login: PropTypes.func,
}

export default Login
