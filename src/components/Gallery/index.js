import React from 'react'
import { connect } from 'react-redux'
import { Images } from 'Components'
import { withRouter } from 'react-router-dom'
import * as selectors from 'Selectors'
import { entities, withRemoteData } from 'Components/Remote'
import { Transition } from 'Components/ui'

const Gallery = ({ images }) => {
  return (
    <Transition duration={{ enter: 300, exit: 300 }} items={images} from={{ opacity: 0 }} enter={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {(data, styled) => {
        return <div style={styled}><Images data={data} /></div>
      }}
    </Transition>
  )
}

const mapStateToProps = (state, props) => ({
  images: selectors.imagesOnPageSelector(state, props)
})

export default withRouter(withRemoteData({
  url: (props) => `photos${props.location.search || props.defaultSearch}`, entity: entities.images
})(connect(mapStateToProps)(Gallery)))
