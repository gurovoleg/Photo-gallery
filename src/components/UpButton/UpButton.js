import React from 'react'
import { Button } from 'semantic-ui-react'
import './upButton.css'

class UpButton extends React.Component {
  state = {
    visible: this.props.visible || false,
    offset: this.props.visible || 50
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.target && prevProps.target !== this.props.target) {
      this.props.target.addEventListener('scroll', this.handleScroll)
    }
  }

  componentWillUnmount () {
    this.props.target.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    // console.log('handleScroll', this.props.target.scrollTop)
    this.setState({ visible: this.props.target.scrollTop > this.state.offset })
  }

  scrollTop = (endPos, step) => {
    setTimeout(() => {
      if (endPos > 0) {
        const newPos = endPos - 1 * step
        this.props.target.scroll(0, newPos)
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
        onClick={() => this.scrollTop(this.props.target.scrollTop, 1)}
      />
    )
  }
}

export default UpButton
