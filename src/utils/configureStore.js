import createRootReducer from 'Reducers/index'
import { logger } from './index'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory, createHashHistory  } from 'history'
import createSagaMiddleware from 'redux-saga'
import rootSaga from 'Sagas'

// export const history = createBrowserHistory()
export const history = createHashHistory() // для GitHub Pages используем hash history

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    createRootReducer(history), // root reducer with router state
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history), // for dispatching history actions
      logger
    )
  )

  sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
