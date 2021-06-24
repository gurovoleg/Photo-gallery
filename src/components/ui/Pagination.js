import React from 'react'
import { Pagination as PaginationUI } from 'semantic-ui-react'

const Pagination = ({ active, total, position = 'center', onChange }) => {
  if (!total) {
    return null
  }

  const handlePageChange = (e, props = {}) => {
    onChange(props.activePage || active)
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

export default Pagination
