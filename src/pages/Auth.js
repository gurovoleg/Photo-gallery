import React from 'react'
import { Loader } from 'semantic-ui-react'
import { actions } from 'Reducers/auth'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

const Auth = ({ login, push }) => {
  // Получаем код авторизации из url (возвращает api)
  if (/\?code=/.test(window.location.search)) {
    const code = window.location.search.replace('?code=', '')
    login(code)
  } else {
    push('/')
  }

  return <Loader active content="Авторизация..." />
}

export default connect(null, { ...actions, push })(Auth)
