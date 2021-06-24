import React from 'react'

import CollectionCardImg from './Card/CardImg'
import CollectionCardInfo from './Card/CardInfo'
import CollectionCardTags from './Card/CardTags'

const Collection = ({ collection }) => {
  return (
    <div className="collection-card">
      <CollectionCardImg collection={collection} />
      <CollectionCardInfo collection={collection} />
      <CollectionCardTags collection={collection} />
    </div>
  )
}

export default Collection
