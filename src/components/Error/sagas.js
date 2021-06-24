import { takeEvery } from 'redux-saga/effects'
import Alert from 'react-s-alert'

function* errorWatcher (action) {
  const { status, message, comment } = action.error

  const content = `<div>${status}</div><div>${message}</div><div>${comment}</div>`
  yield Alert.error(content)
}

export const error = [
  takeEvery(action => action.error, errorWatcher)
]
