import React from 'react'
import { connect } from 'react-redux'
import { Pagination, Transition } from 'Components/ui'
import { Gallery } from 'Components'
import { withRouter } from 'react-router-dom'
import * as selectors from 'Selectors'

const Home = ({ total, perPage = 15, urlPage }) => {

  return (
    <React.Fragment>

      <span><h1>Все фотографии</h1></span>
      <span>{total}</span>

      {/* Активную страницу селектор берет из url */}
      <Pagination
        active={urlPage}
        total={Math.floor(total / perPage)}
        perPage={perPage}
      />

      <Gallery defaultSearch={`?page=${urlPage}&per_page=${perPage}`} />

    </React.Fragment>
  )
}

const mapStateToProps = (state, props) => ({
  total: selectors.imagesSelector(state).total || '',
  urlPage: selectors.activePageSelector()(state, props)
})

export default withRouter((connect(mapStateToProps)(Home)))
