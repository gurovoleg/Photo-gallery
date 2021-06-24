import * as storage from 'Utils/storage'

export const types = {
  LOGIN_REQUEST: 'auth/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'auth/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'auth/LOGIN_FAILURE',
  LOGOUT: 'auth/LOGOUT',
  PROFILE_LOAD: 'auth/PROFILE_LOAD',
  PROFILE_LOAD_SUCCESS: 'auth/PROFILE_LOAD_SUCCESS',
  PROFILE_LOAD_FAILURE: 'auth/PROFILE_LOAD_FAILURE'
}

const initialState = (reset = false) => {
  const auth = storage.get('auth')
  const profile = storage.get('profile')
  return {
    token: (!reset && auth) || '',
    profile
  }
}

const auth = (state = initialState(), action) => {
  switch (action.type) {
    case types.PROFILE_LOAD_SUCCESS:
      return {
        ...state,
        profile: action.profile
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token
      }
    case types.LOGIN_FAILURE:
    case types.LOGIN_REQUEST:
    case types.LOGOUT:
      return initialState(true)
    default:
      return state
  }
}

export const actions = {
  login: (code) => ({ type: types.LOGIN_REQUEST, code }),
  logout: () => ({ type: types.LOGOUT }),
  loadProfile: (token) => ({ type: types.PROFILE_LOAD, token })
}

export default auth
