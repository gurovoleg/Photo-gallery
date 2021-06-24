import React, { useState } from 'react'
import { Transition } from 'Components/ui'
import { withRouter, Switch, Route, Link } from 'react-router-dom'

let count = 0

function createItem (state) {
  console.log('state', state)
  count++
  const newItem = { id: count, name: `Block ${count}` }
  return [...state, newItem]
}

function deleteItem (state, value) {
  const idx = state.indexOf(value)
  return [...state.slice(0, idx), ...state.slice(idx + 1)]
}

const User = (props) => {
  const [show, setShow] = useState(false)

  const [data, setData] = useState([])

  return (
    <React.Fragment>
      <h1>User page</h1>
      <button onClick={() => setShow(state => !state)} style={{ marginBottom: '10px' }}>Toggle</button>

      <button onClick={() => setData(state => createItem(state))} style={{ marginBottom: '10px' }}>add data</button>
      <button onClick={() => setData([])} style={{ marginBottom: '10px' }}>delete data</button>
      {/*<button onClick={() => setData(state => state.slice(1))} style={{ marginBottom: '10px' }}>delete data</button>*/}


       <Transition items={show} duration={500} from={{ opacity: 0 }} enter={{ opacity: 1 }} exit={{ opacity: 0 }}>
       {/*<TransitionGroup items={show} duration={5500} style={{ overflow: 'hidden' }} from={{ maxHeight: '0px' }} enter={{ maxHeight: '100px' }} exit={{ maxHeight: 0 }}>*/}
         {(data, styled) => <div style={{ ...styledBlock, ...styled }} />}
       </Transition>

      <div style={{ marginTop: '20px' }}>
        <Link className="mar-right_sm" to={`${props.match.url}/block1`}>Block 1</Link>
        <Link className="mar-right_sm" to={`${props.match.url}/block2`}>Block 2</Link>
        <Link className="mar-right_sm" to={`${props.match.url}/block3`}>Block 3</Link>

        <Transition items={props.location} keys={location => location.pathname} duration={300} from={{ opacity: 0 }} enter={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {/*<Transition items={props.location} keys={location => location.pathname} duration={1000} from={{ opacity: 0 }} enter={{ opacity: 1 }} exit={{ opacity: 0 }}>*/}
        {/*<Transition items={props.location} keys={location => location.pathname} duration={1000} style={{ overflow: 'hidden' }} from={{ maxHeight: '0px' }} enter={{ maxHeight: '300px' }} exit={{ maxHeight: 0 }}>*/}
          {(location, styled) => (
            <Switch location={location}>
              <Route path={`${props.match.path}/block1`} render={() => <div style={{ ...styledBlock, ...styled }}>Block 1</div>} />
              <Route path={`${props.match.path}/block2`} render={() => <div style={{ ...styledBlock, ...styled }}>Block 2</div>} />
              <Route path={`${props.match.path}/block3`} render={() => <div style={{ ...styledBlock, ...styled }}>Block 3</div>} />
            </Switch>
         )}
        </Transition>

        <Transition group items={data} keys={data => data.id} duration={500} from={{ transform: 'translateX(-300px)', opacity: 0 }} enter={{ transform: 'translateX(0px)', opacity: 1 }} exit={{ transform: 'translateX(-300px)', opacity: 0 }}>
          {/* <TransitionGroup items={data} duration={500} style={{ overflow: 'hidden' }} from={{ maxHeight: '0px', opacity: 0 }} enter={{ maxHeight: '300px', opacity: 1 }} exit={{ maxHeight: 0, opacity: 0 }}> */}
          {(data, styled) => (
            <div style={{ ...styledBlock, ...styled }} onClick={() => setData(state => deleteItem(state, data))}>
              {data.name}
            </div>)}
        </Transition>

      </div>

    </React.Fragment>
  )
}

export default withRouter(User)

const styledBlock = {
  width: '200px',
  // height: '200px',
  background: 'blue',
  color: '#fff',
  textAlign: 'center',
  padding: '20px',
  fontSize: '20px',
  marginBottom: '10px',
  opacity: 1
}
