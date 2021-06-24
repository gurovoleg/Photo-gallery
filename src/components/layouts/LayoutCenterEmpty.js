import React from 'react'
import './layout.css'
// import LoadingBar from 'react-redux-loading-bar'

const LayoutCenterEmpty = (props) => {
  return (
    <div className="layoutEmptyCenterWrapper">
      {/*<LoadingBar className="loading-bar" />*/}
      <div className="LayoutCenterEmpty">
        {props.children}
      </div>
    </div>
  )
}

export default LayoutCenterEmpty
