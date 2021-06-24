import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'
import { Cover } from './index'
import { Transition } from 'Components/ui'

class Photo extends React.Component {
  constructor () {
    super()
    this.state = { showHover: false }
  }

  render () {
    const { image } = this.props
    return (
      <div>
      {/*<Transition duration={500} show={image} from={{ transform: 'scale(0.9)', opacity: 0 }} enter={{ transform: 'scale(1)', opacity: 1 }}>*/}
        <div style={{ padding: '1rem 0' }}>
          <Link to={`/images/${image.id}`}>
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => { this.setState({ showHover: true }) }}
              onMouseLeave={() => { this.setState({ showHover: false }) }}>

              <Image src={image.urls.small} />
              {this.state.showHover && <Cover image={image} />}

            </div>
          </Link>
        </div>
      {/*</Transition>*/}
      </div>
    )
  }
}

export default Photo
