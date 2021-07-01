import React, { Fragment } from 'react'
import { Container } from 'semantic-ui-react'
import { UpButton, Header } from 'Components'
import './layout.css'
import { actions } from 'Reducers/auth'
import { connect } from 'react-redux'
import * as storage from 'Utils/storage'

class BaseLayout extends React.Component {
  state = {
    headerHeight: null,
    documentHeight: document.documentElement.clientHeight,
  }

  headerRef = React.createRef()
  wrapperRef = React.createRef() // ссылка для обертки с контентом (используем для кнопки прокрутки вверх)

  getProfile () {
    if (this.props.token && !this.props.profile) {
      this.props.loadProfile(this.props.token)
    }
  }

  handleResize = () => {
    this.setState({ documentHeight: document.documentElement.clientHeight })
  }

  componentDidMount () {
    this.getProfile()
    const headerHeight = this.headerRef.current.offsetHeight
    this.setState({ headerHeight })

    window.addEventListener('resize', this.handleResize)
    document.body.classList.add('overflow-hidden')
  }

  componentDidUpdate (prevProps) {
    if (prevProps.token !== this.props.token) {
      this.getProfile()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
    document.body.classList.remove('overflow-hidden')
  }

  render () {
    const { headerHeight, documentHeight } = this.state
    const containerHeight = documentHeight - headerHeight

    return (
      <Fragment>
        <Header fixed headerRef={this.headerRef} profile={this.props.profile} />
        <UpButton target={this.wrapperRef.current} />

        {/* Обертка для позиционирования контейнера и скролла (отключен у body) */}
        <div ref={this.wrapperRef} style={{ marginTop: headerHeight, height: containerHeight, overflowY: 'auto' }}>
          <Container className="main-container">
            {this.props.children}
          </Container>
        </div>

      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: storage.get('profile'),
  token: storage.get('auth')
})

const mapDispatchToProps = (dispatch) => ({
  loadProfile: (token) => dispatch(actions.loadProfile(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout)
