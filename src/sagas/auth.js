import { types } from 'Reducers/auth'
import { takeEvery, put, delay, call } from 'redux-saga/effects'
import * as storage from 'Utils/storage'
import { push } from 'connected-react-router'
import Alert from 'react-s-alert'
import { api, auth as authRemote } from 'Components/Remote'

function* loginWatcher (action) {
  try {
    const result = yield call(api.POST, { url: authRemote.getToken(action.code), api: false })
    if (result && result.access_token) {
      yield call(storage.put, 'auth', result.access_token)
      yield put({ type: types.LOGIN_SUCCESS, token: result.access_token })
      yield put(push('/'))
    }
  } catch (error) {
    yield put({ type: types.LOGIN_FAILURE, error })
  }
}

function* loadProfileWatcher (action) {
  try {
    const profile = yield call(api.GET, { url: 'me', headers: { Authorization: `Bearer ${action.token}` } })
    yield call(storage.put, 'profile', profile.data)
    yield put({ type: types.PROFILE_LOAD_SUCCESS, profile: profile.data })
    yield Alert.success(`${profile.data.name}, добро пожаловать!`)
  } catch (error) {
    yield put({ type: types.PROFILE_LOAD_FAILURE, error })
  }
}

function* logoutWatcher () {
  yield call(storage.remove, 'auth')
  yield call(storage.remove, 'profile')
  yield put(push('/'))
}

export const auth = [
  takeEvery(types.LOGIN_REQUEST, loginWatcher),
  takeEvery(types.LOGOUT, logoutWatcher),
  takeEvery(types.PROFILE_LOAD, loadProfileWatcher)
]
