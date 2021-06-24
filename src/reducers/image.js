export const types = {
  IMAGE_LIKE: '@image/IMAGE_LIKE',
}

export const actions = {
  like: (id, isLike) => ({ type: types.IMAGE_LIKE, id, isLike })
}
