import { all } from 'redux-saga/effects'
import { remote } from 'Components/Remote/sagas'
import { error } from 'Components/Error/sagas'
import { auth } from './auth'
import { image } from './image'

export default function* rootSaga () {
  yield all([
    ...remote,
    ...auth,
    ...error,
    ...image
  ])
}