import React, { useEffect, useState } from 'react'
import * as selectors from 'Selectors'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Pagination } from 'Components/ui'
import { Collections } from 'Components'

const CollectionsPage = ({ history, total, perPage = 10, urlPage }) => {

  // локальный state для текущей страницы (получаем из url)
  const [activePage, setActivePage] = useState(urlPage)

  // задаем url с параметрами page и per_page
  useEffect(() => {
    history.push(`/collections/?page=${activePage}&per_page=${perPage}`)
  }, [activePage])

  return (
    <React.Fragment>
      <span><h1>Коллекции</h1></span>
      <span>{total}</span>

      <Pagination
        active={activePage}
        onChange={setActivePage}
        total={Math.floor(total / perPage)}
      />

      <Collections />

    </React.Fragment>
  )
}

const mapStateToProps = (state, props) => ({
  total: selectors.collectionsSelector(state).total || '',
  urlPage: selectors.activePageSelector()(state, props)
})

export default withRouter(connect(mapStateToProps)(CollectionsPage))
