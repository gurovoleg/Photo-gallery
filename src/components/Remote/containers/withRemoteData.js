import React from 'react'
import { status } from '../settings'
import { Loader, Container, Segment, Button } from 'semantic-ui-react'
import { actions } from '../reducers'
import { connect } from 'react-redux'
import * as selectors from 'Selectors'

const makeURL = (url, data) => {
  return {}.toString.call(url) === '[object Function]' ? url(data) : url
}

const withRemoteData = ({ url, headers, entity }) => WrappedComponent => {
  class WithRemoteData extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        hasError: false,
        status: this.props.remoteRequest.status
      }
      // url = url.constructor === Function ? url(this.props) : url
    }

    fetchData () {
      const { getData, remoteRequest } = this.props
      if ([status.NEEDS_UPDATE, status.NOT_ASKED].includes(remoteRequest.status)) {
        getData(url, entity, headers)
        this.setState({ status: remoteRequest.status })
      }
    }

    componentDidMount () {
      this.fetchData()
    }

    componentDidUpdate (prevProps) {
      this.fetchData()
      const { remoteRequest } = this.props
      if (prevProps.remoteRequest.status !== remoteRequest.status) {
        this.setState({ status: remoteRequest.status })
      }
    }

    componentDidCatch (error, info) {
      this.setState({ hasError: true, error, info })
    }

    render () {
      const { error } = this.props.remoteRequest

      switch (true) {
        case this.state.hasError:
          return <Container textAlign='center'><h1>Something went wrong.</h1></Container>

        case this.state.status === status.FAILURE:
          return (
            <Container textAlign='center'>
              <div>
                {error.message}&nbsp;&nbsp;
                <Button circular icon='refresh' onClick={() => {}} />
              </div>
            </Container>)

        case [status.FETCHING, status.NOT_ASKED].includes(this.state.status):
          return <Loader active />

        case this.state.status === status.LOADED:
          return <WrappedComponent {...this.props} />

        default:
          return <Segment placeholder textAlign='center'>Данные ожидаются!!!</Segment>
      }
    }
  }

  const mapStateToProps = (state, props) => {
    return {
      remoteRequest: selectors.remoteStatusSelector(state, { url: makeURL(url, props) }) || { status: status.NOT_ASKED }
    }
  }

  const mapDispatchToProps = (dispatch, props) => ({
    getData: (url, entity, headers) => dispatch(actions.get(makeURL(url, props), entity, headers))
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithRemoteData)
}

export default withRemoteData
