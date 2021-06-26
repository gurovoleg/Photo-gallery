import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Pagination, Transition } from 'Components/ui'
import { Gallery } from 'Components'
import { withRouter } from 'react-router-dom'
import * as selectors from 'Selectors'

const Home = ({ history, total, perPage = 15, urlPage, match }) => {
  // локальный state для текущей страницы (получаем из url)
  const [activePage, setActivePage] = useState(urlPage)

  console.log('%c match ', 'color:white;background:blue', match, location)

  // задаем новый url с параметрами page и per_page
  useEffect(() => {
    history.push(`?page=${activePage}&per_page=${perPage}`)
  }, [activePage])

  return (
    <React.Fragment>

      <span><h1>Все фотографии</h1></span>
      <span>{total}</span>

      <Pagination
        active={activePage}
        onChange={setActivePage}
        total={Math.floor(total / perPage)}
      />

      <Gallery />

    </React.Fragment>
  )
}

const mapStateToProps = (state, props) => ({
  total: selectors.imagesSelector(state).total || '',
  urlPage: selectors.activePageSelector()(state, props)
})

export default withRouter((connect(mapStateToProps)(Home)))
