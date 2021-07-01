import React from 'react'
import { Pagination as PaginationUI } from 'semantic-ui-react'
import { withRouter } from "react-router-dom"

const Pagination = ({ active, total, perPage = 15, position = 'center', history }) => {
  if (!total) {
    return null
  }

  const handlePageChange = (e, props = {}) => {
    history.push(`?page=${props.activePage}&per_page=${perPage}`)
  }

  return (
    <div style={{ textAlign: position, padding: '20px 0' }}>
      <PaginationUI
        activePage={active}
        onPageChange={handlePageChange}
        totalPages={total}
        nextItem={null}
        prevItem={null}
        pointing
        secondary
      />
    </div>
  )
}

export default withRouter(Pagination)
