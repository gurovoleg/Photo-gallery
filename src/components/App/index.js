import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import BaseLayout from 'Components/layouts/BaseLayout'
import { Home, User, Collections, Auth } from 'Pages'
import { Image } from 'Components'

const App = () => {
  return (
    <BaseLayout>
      <Switch>
        <Route path="/images/:imageId" component={Image} />
        <Route path="/user" component={User} />
        <Route path="/collections" component={Collections} />
        <Route path="/oauth/callback" component={Auth} />
        <Route component={Home} />
      </Switch>
    </BaseLayout>
  )
}

export default App
