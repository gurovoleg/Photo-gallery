import { status } from './settings'
import { combineReducers } from 'redux'

export const types = {
  GET: 'REQUEST_GET',
  GET_SUCCESS: 'REQUEST_GET_SUCCESS',
  GET_FAILURE: 'REQUEST_GET_FAILURE',
  DATA_RECEIVED: 'DATA_RECEIVED',
  DOWNLOAD: 'REQUEST_DOWNLOAD',
  DOWNLOAD_FAILURE: 'REQUEST_DOWNLOAD_FAILURE'
}

const statusData = (state = {}, action) => {
  switch (action.type) {
    case types.GET:
      return { status: status.FETCHING, time: Date.now() }
    case types.GET_SUCCESS:
      return { status: status.LOADED, time: Date.now() }
    case types.GET_FAILURE:
      return { status: status.FAILURE, time: Date.now(), error: action.error }
    default:
      return state
  }
}

const statusReducer = (state = {}, action) => {
  if (action.url && action.type.startsWith('REQUEST')) {
    return { ...state, [action.url]: statusData(state[action.url], action) }
  }
  return state
}

const dataInitialState = {
  images: {
    total: '',
    data: [],
    pagination: {}
  },
  collections: {
    total: '',
    data: [],
    pagination: {}
  }
}

const dataReducer = (state = dataInitialState, action) => {
  switch (action.type) {
    case types.DATA_RECEIVED:
      return {
        ...state,
        [action.entity]: {
          total: action.payload.total || state[action.entity].total,
          data: mergeWith(state[action.entity].data, action.payload.data),
          pagination: {
            ...state[action.entity].pagination,
            ...action.payload.page
          }
        }
      }
    default:
      return state
  }
}

const mergeWith = (dest, source) => {
  let result = []

  if (Array.isArray(source)) {
    result = [...dest, ...source]
  } else {
    // Поиск индекса элемента в массиве
    const idx = dest.findIndex(item => item.id === source.id)
    // Индекс найден
    if (idx !== -1) {
      result = [...dest.slice(0, idx), source, ...dest.slice(idx + 1)]
    } else {
      // Элемента нет в массиве => возвращаем исходный массив + новый элемент
      result = [...dest, source]
    }
  }
  return result
}

const remote = combineReducers({
  status: statusReducer,
  data: dataReducer
})

export default remote

export const actions = {
  get: (url, entity, headers) => ({ type: types.GET, url, entity, headers }),
  download: (url, filename, trackUrl, headers) => ({ type: types.DOWNLOAD, url, trackUrl, filename, headers })
}
