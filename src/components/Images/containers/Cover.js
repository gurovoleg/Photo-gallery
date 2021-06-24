import React from 'react'
import { Image, Statistic, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { actions } from 'Components/Remote'
import { actions as actionsImages } from 'Reducers/image'
import { withRouter } from 'react-router-dom'
import { push } from 'connected-react-router'

const Cover = ({ image, download, push, like }) => {
  return (
    <div style={styledCover}>
      {/* Avatar */}
      <div className="user-avatar" onClick={(e) => {
        e.preventDefault()
        push(`/user/${image.user.username}`)
      }}>
        <div style={{ marginRight: '10px' }}>
          <Image src={image.user.profile_image.medium} circular />
        </div>
        <div>
          <div className="text-white">{image.user.first_name}</div>
          <div className="text-white">{image.user.last_name}</div>
        </div>
      </div>

      {/* Likes */}
      <div
        style={{ cursor: 'pointer' }}
        onClick={(e) => {
          e.preventDefault()
          like(image.id, !image.liked_by_user)
        }}>
        <Statistic color='red' inverted size="tiny">
          <Statistic.Value><Icon name="heart" />&nbsp;{image.likes}</Statistic.Value>
          <Statistic.Label>likes</Statistic.Label>
        </Statistic>
      </div>

      {/* Download */}
      <Icon
        name="cloud download"
        size="big"
        inverted
        style={{ position: 'absolute', bottom: '20px', right: '20px', cursor: 'pointer' }}
        onClick={(e) => {
          e.preventDefault()
          console.log('CLICK', image.links.download_location)
          download(image.urls.regular, `img-${image.id}`, image.links.download_location)
        }} />

    </div>
  )
}

const styledCover = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'space-between',
  top: 0,
  left: 0,
  padding: '20px',
  height: '100%',
  width: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  cursor: 'zoom-in'
}

const mapDispatchToProps = (dispatch) => ({
  download: (url, filename, trackUrl) => dispatch(actions.download(url, filename, trackUrl)),
  push: (path) => dispatch(push(path)),
  like: (id, isLike) => dispatch(actionsImages.like(id, isLike))
})

export default withRouter(connect(null, mapDispatchToProps)(Cover))
