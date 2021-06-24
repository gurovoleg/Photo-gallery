import React from 'react';


const CollectionCardImg = ({ collection }) => {

	return (
		<a href={collection.links.html} className="img-wrapper" target='_blank'>
			<div className="img-main">
				<img src={collection.preview_photos[0].urls.small} alt="img" />
			</div>
			<div className="img-thumb">
				<img src={collection.preview_photos[1].urls.small} alt="img" />
				<img src={collection.preview_photos[2].urls.small} alt="img" />
			</div>
		</a>
	)
}


export default CollectionCardImg;