import React from 'react'
import ReactDOM from 'react-dom'
import { App, Alert } from './components'
import { Guidelines, Login, Auth } from './pages'
import { Switch, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './styles/style.scss'
import configureStore, { history } from './utils/configureStore'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Alert />
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/guidelines" component={Guidelines} />
        <Route path="/login" component={Login} />
        <Route path="/oauth/callback" component={Auth} />
        <Route path="/" component={App} />
        <Route render={() => <h1>404 Page not found</h1>} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
