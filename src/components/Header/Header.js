import React, { useState, useEffect } from 'react'
import './header.scss'
import { Button, Icon, Menu } from 'semantic-ui-react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { auth } from 'Components/Remote'
import { actions } from 'Reducers/auth'
import { withRouter } from 'react-router-dom'

const getMenuItem = (value) => {
  switch (value) {
    case 'collections':
      return 'Коллекции'
    case 'user':
      return 'Пользователь'
    default:
      return 'Главная'
  }
}

const Header = ({ fixed, headerRef, redirect, profile, logout }) => {
  const entity = window.location.pathname.split('/')[1]
  const [active, setActive] = useState(getMenuItem(entity))

  const handleItemClick = (name, url) => {
    setActive(name)
    redirect(url)
  }

  useEffect(() => {
    setActive(getMenuItem(entity))
  }, [entity])

  return (
    <div ref={headerRef} className={fixed ? 'main-header main-header--fixed' : 'main-header'}>

      {/* Лого */}
      <div className="main-header__logo">
        <Icon name="camera retro" className="main-header__logo-image" />
        <span className="main-header__logo-title">Image Gallery</span>
      </div>

      {/* Навигация */}
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name='Главная'
            className="main-header__link"
            active={active === 'Главная'}
            onClick={() => handleItemClick('Главная', '/')}
          />
          <Menu.Item
            name='Коллекции'
            className="main-header__link"
            active={active === 'Коллекции'}
            onClick={() => handleItemClick('Коллекции', '/collections')}
          />
          <Menu.Item
            name='Пользователь'
            className="main-header__link"
            active={active === 'Пользователь'}
            onClick={() => handleItemClick('Пользователь', '/user')}
          />

        </Menu>
      </div>

      {/* Logout + User */}
      <div className="main-header__user">
        {profile && <div style={{ marginRight: '10px' }}>{profile.name}</div>}
        {profile && <Button content="Выйти" onClick={logout} />}
        {!profile && <Button content="Войти" color='blue' onClick={() => {
          document.location.href = auth.request()
        }} />}
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  redirect: (url) => dispatch(push(url)),
  logout: () => dispatch(actions.logout())
})

export default withRouter(connect(null, mapDispatchToProps)(Header))
