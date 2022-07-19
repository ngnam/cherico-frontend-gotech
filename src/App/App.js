import React from 'react'
// import Logo from './logo.svg'
import Router from './Router'
import { Provider } from './context'

import css from './styles.scss'

function App(props) {
  return (
    <Provider>
      <div className={`app ${css.class}`}>
        <Router />
      </div>
    </Provider>
  )
}

export default App
