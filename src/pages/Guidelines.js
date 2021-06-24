import React from 'react'
import { Container, Button } from 'semantic-ui-react'

class Guidelines extends React.Component {
  constructor() {
    super()
    this.state = {
      title: 'Oleg Gurov'
    }
    console.log('%c App constructor ', 'color:white;background:blue')
  }

  componentDidMount() {
    console.log('App componentDidMount')
  }

  render() {
    console.log('App render')
    return (
      <Container>
        <Header title={this.state.title} />
      </Container>
    )
  }
}

class Header extends React.Component {
  constructor() {
    super()
    this.state = { isUserLogged: false }
    console.log('Header constructor')
  }

  componentDidMount() {
    console.log('Header componentDidMount')
  }

  render() {
    console.log('Header render', this.state, this.props)
    return (
      <React.Fragment>
        <h3>Header</h3>

        <Title text={this.props.title} show={this.state.isUserLogged} />

        <Button content='Login' onClick={() => this.setState((state) => ({ isUserLogged: !state.isUserLogged }))} />

      </React.Fragment>
    )
  }
}

const Title = ({ text, show }) => {
  if (!show) {
    return null
  }
  return <h1>{text}</h1>
}

export default Guidelines
