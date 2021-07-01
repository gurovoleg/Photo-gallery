import React from 'react'
import * as selectors from 'Selectors'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Pagination } from 'Components/ui'
import { Collections } from 'Components'

const CollectionsPage = ({ total, perPage = 12, urlPage }) => {

  return (
    <React.Fragment>
      <span><h1>Коллекции</h1></span>
      <span>{total}</span>

      <Pagination
        active={urlPage}
        perPage={perPage}
        total={Math.floor(total / perPage)}
      />

      <Collections defaultSearch={`?page=${urlPage}&per_page=${perPage}`} />

    </React.Fragment>
  )
}

const mapStateToProps = (state, props) => ({
  total: selectors.collectionsSelector(state).total || '',
  urlPage: selectors.activePageSelector()(state, props)
})

export default withRouter(connect(mapStateToProps)(CollectionsPage))
