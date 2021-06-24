import React from 'react'

const CollectionCardTags = ({ collection }) => {
  // const tags = []
  //
  // for (let i = 0; i < 3; i++) {
  //   tags.push(<a key={i + 1} href={collection.links.html} target='_blank' rel='noopener noreferrer'> {collection.tags[i].title} </a>)
  // }

  return (
    <nav className="collection-card-tags">
      {collection.tags.slice(0, 3).map((tag, idx) => {
        return <a key={idx} href={collection.links.html} target='_blank' rel='noopener noreferrer'> {tag.title} </a>
      })}
      {/*{tags}*/}
    </nav>
  )
}
export default CollectionCardTags
