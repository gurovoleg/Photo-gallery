import { takeEvery, call, put } from 'redux-saga/effects'
import { types } from './reducers'
import * as api from 'Components/Remote/api'

// Загрузка данных
function* getRequestWatcher (action) {
  try {
    const pageSearch = /page=\d+/.exec(action.url)
    const page = pageSearch ? pageSearch[0].replace('page=', '') : null
    const result = yield call(api.GET, { url: action.url })

    // добавляем данные для пагинации
    if (page && Array.isArray(result.data)) {
      result.page = {
        [page]: result.data.map(item => item.id)
      }
    }

    yield put({ type: types.DATA_RECEIVED, payload: result, entity: action.entity })
    yield put({ type: types.GET_SUCCESS, url: action.url })
  } catch (error) {
    yield put({ type: types.GET_FAILURE, url: action.url, error })
  }
}

// Скачать файл
function* downloadRequestWatcher ({ url, trackUrl, filename }) {
  console.log('downloadRequestWatcher', trackUrl)
  try {
    yield call(api.DOWNLOAD, url, filename)
    yield call(api.GET, { url: trackUrl, api: false }) // GET запрос для отслеживания сервисом скачиваемых изображения (требования Unsplash)
  } catch (error) {
    yield put({ type: types.DOWNLOAD_FAILURE, url, error })
  }
}

export const remote = [
  takeEvery(types.GET, getRequestWatcher),
  takeEvery(types.DOWNLOAD, downloadRequestWatcher)
]
