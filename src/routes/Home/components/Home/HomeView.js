import React from 'react'
import { Grid, Form, Button, Container, Header, Icon} from 'semantic-ui-react'

const HeaderContent = Header.Content
const FormField = Form.Field
const GridRow = Grid.Row
export const HomeView = (props) => (
  <div>
    <div className="sign-in container">
      <Container>
        <Header as='h1' icon textAlign='center'>
            <Icon name='users' color='white' circular />
            <HeaderContent>
              Home
            </HeaderContent>
          </Header>
      </Container>
    </div>
  </div>
)

export default HomeView
