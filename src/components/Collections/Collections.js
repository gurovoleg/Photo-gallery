import React from 'react'
import { connect } from 'react-redux'
import * as selectors from 'Selectors'
import { entities, withRemoteData } from 'Components/Remote'
import { withRouter } from 'react-router-dom'
import Collection from './containers/Collection'

const Collections = ({ collections }) => {
  return (
    <div className="collection-cards">
      {collections.map((item) => <Collection key={item.id} collection={item} />)}
    </div>
  )
}

const mapStateToProps = (state, props) => ({
  collections: selectors.collectionsOnPageSelector(state, props)
})

export default withRouter(connect(mapStateToProps)(withRemoteData({
  url: (props) => `collections${props.location.search}`, entity: entities.collections
})(Collections)))
