import { takeEvery, call, put } from 'redux-saga/effects'
import { types } from 'Reducers/image'
import { types as typesRemote, entities, auth } from 'Components/Remote'
import * as api from 'Components/Remote/api'
import * as storage from 'Utils/storage'

function* likeImageWatcher (action) {
  const token = yield call(storage.get, 'auth')
  if (token) {
    try {
      yield call(action.isLike ? api.POST : api.DELETE, { url: `photos/${action.id}/like` }) // поставить like/unlike
      const result = yield call(api.GET, { url: `photos/${action.id}` }) // получить обновленные данные по фотографии
      yield put({ type: typesRemote.DATA_RECEIVED, payload: { data: result.data }, entity: entities.images }) // обновить хранилище
    } catch (error) {
      yield put({ type: 'ERROR', error })
    }
  } else {
    document.location.href = auth.request() // перенапрвляем на страницу авторизации unsplash
  }
}

export const image = [
  takeEvery(types.IMAGE_LIKE, likeImageWatcher)
]
