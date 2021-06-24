import React from 'react';

// const target = '_blank';
const CollectionCardInfo = (props) => {

	const collection = props.collection;
	return (
		<div className="collection-card-info">
			<a href={collection.links.html} className="collection-title" target='_blank'>{collection.title}</a>
			<p className="collection-decrip">
				<span> {collection.user.total_photos} photos</span>
				<span> Curated by {collection.user.name}</span>
			</p>
		</div>
	)
}
export default CollectionCardInfo;