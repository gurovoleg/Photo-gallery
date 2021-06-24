import React from 'react'

const UnsplashLabel = ({ image }) => {
  return (
    <div style={{ padding: '10px' }}>Photo by <b>{image.user.name}</b> on <a href="http://www.unsplash.com">Unsplash</a></div>
  )
}

export default UnsplashLabel
