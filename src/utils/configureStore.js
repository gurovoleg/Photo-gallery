import createRootReducer from 'Reducers/index'
import { logger } from './index'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory, createHashHistory  } from 'history'
import createSagaMiddleware from 'redux-saga'
import rootSaga from 'Sagas'

export const history = createBrowserHistory()

/*
GitHub Pages doesn’t support routers that use the HTML5 pushState history API under the hood
(for example, React Router using browserHistory). This is because when there is a fresh page load for a url
like http://user.github.io/todomvc/todos/42, where /todos/42 is a frontend route, the GitHub Pages server returns 404
because it knows nothing of /todos/42. If you want to add a router to a project hosted on GitHub Pages:
You could switch from using HTML5 history API to routing with hashes. If you use React Router, you can switch to hashHistory for this effect.
 */
// export const history = createHashHistory() // для GitHub Pages используем hash history

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
