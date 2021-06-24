import { createSelector } from 'reselect'

export const idSelector = name => (state, props) => {
  if (props[name]) {
    return props[name]
  } else if (props.match && props.match.params[name]) {
    return props.match.params[name]
  } else {
    return undefined
  }
}

// селектор текущей страницы (вытаскиваем из url или если задан параметр)
export const activePageSelector = (name) => (state, props) => {
  if (name && props[name]) {
    return props[name]
  } else if (props.location && props.location.search) {
    const urlPageData = /page=\d+/.exec(props.location.search)
    return urlPageData ? urlPageData[0].replace('page=', '') : 1
  } else {
    return 1
  }
}

export const remoteSelector = state => state.remote

export const remoteDataSelector = createSelector(remoteSelector, (remote) => {
  return remote.data || {}
})

export const remoteStatusSelector = (state, props) => {
  return state.remote.status[props.url]
}

// селектор всех изображений + пагинация + total
export const imagesSelector = createSelector(remoteDataSelector, (data) => {
  return data.images || {}
})

// селектор всех изображений
export const imagesDataSelector = createSelector(imagesSelector, (images) => {
  return images.data || []
})

// селектор изображения
export const imageSelector = createSelector([imagesDataSelector, idSelector('imageId')], (data, imageId) => {
  return data.find(image => image.id === imageId)
})

// селектор пагинация по страницам
export const imagesPaginationSelector = createSelector(imagesSelector, (images) => {
  return images.pagination || {}
})

// селектор страница пагинации
export const imagesPaginationPageSelector = createSelector([imagesPaginationSelector, activePageSelector()], (pagination, page) => {
  return pagination[page] || []
})

// селектор изображений на странице
export const imagesOnPageSelector = createSelector([imagesDataSelector, imagesPaginationPageSelector], (images, idsPage) => {
  return idsPage.map(imageId => images.find(({ id }) => id === imageId)) || []
})

// КОЛЛЕКЦИИ
// селектор всех коллекций + пагинация + total
export const collectionsSelector = createSelector(remoteDataSelector, (data) => {
  console.log('collectionsSelector', data)
  return data.collections || {}
})

// селектор всех изображений
export const collectionsDataSelector = createSelector(collectionsSelector, (collections) => {
  return collections.data || []
})

// селектор коллекции
export const collectionSelector = createSelector([collectionsDataSelector, idSelector('collectionId')], (data, collectionId) => {
  return data.find(collection => collection.id === collectionId)
})

// селектор пагинация по страницам
export const collectionsPaginationSelector = createSelector(collectionsSelector, (collections) => {
  return collections.pagination || {}
})

// селектор страница пагинации
export const collectionsPaginationPageSelector = createSelector([collectionsPaginationSelector, activePageSelector()], (pagination, page) => {
  return pagination[page] || []
})

// селектор коллекций на странице
export const collectionsOnPageSelector = createSelector([collectionsDataSelector, collectionsPaginationPageSelector], (collections, idsPage) => {
  return idsPage.map(collectionId => collections.find(({ id }) => id === collectionId))
})
