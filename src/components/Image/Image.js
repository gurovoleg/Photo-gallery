import React from 'react'
import { connect } from 'react-redux'
import { imageSelector } from 'Selectors'
import { withRemoteData, actions, entities } from 'Components/Remote'
import { withRouter } from 'react-router-dom'
import { Image as ImageSemantic, Modal } from 'semantic-ui-react'
import { goBack } from 'connected-react-router'
import Info from './Info'
import { UnsplashLabel } from 'Components'

const Image = ({ imageData, goBack, download }) => {
  return (
    <Modal open onClose={() => goBack()} dimmer="blurring">
      <Modal.Header className="no-border">
        <Info image={imageData} download={download} />
      </Modal.Header>
      <Modal.Content style={{ minHeight: '50vh', textAlign: 'center' }}>
        <ImageSemantic src={imageData.urls.regular} style={{ zIndex: 1001 }} />
        <UnsplashLabel image={imageData} />
        {/* <ImageSemantic src={imageData.urls.regular} style={{ height: '70vh', width: 'auto', margin: '0 auto' }} /> */}
      </Modal.Content>

    </Modal>
  )
}

const mapStateToProps = (state, props) => ({
  imageData: imageSelector(state, props)
})

const mapDispatchToProps = (dispatch) => ({
  goBack: () => dispatch(goBack()),
  download: (url, filename) => dispatch(actions.download(url, filename))
})

export default withRouter(withRemoteData({
  url: (props) => `photos/${props.match.params.imageId}`, entity: entities.images
})(connect(mapStateToProps, mapDispatchToProps)(Image)))
