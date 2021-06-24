import React from 'react'
import { Button } from 'semantic-ui-react'
import './upButton.css'

class UpButton extends React.Component {
  state = {
    visible: this.props.visible || false,
    offset: this.props.visible || 50
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    this.setState({ visible: window.pageYOffset > this.state.offset })
  }

  scrollTop = (endPos, step) => {
    setTimeout(() => {
      if (endPos > 0) {
        const newPos = endPos - 1 * step
        window.scroll(0, newPos)
        this.scrollTop(newPos, step + 2)
      }
    }, 5)
  };

  render () {
    return (
      <Button
        circular
        icon='angle up'
        size="big"
        color="black"
        className={this.state.visible ? 'upButton upButton--visible' : 'upButton'}
        onClick={() => this.scrollTop(window.pageYOffset, 1)}
      />
    )
  }
}

export default UpButton
