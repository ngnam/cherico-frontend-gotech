import 'core-js/stable'

import React from 'react'
import { render } from 'react-dom'
import smoothscroll from 'smoothscroll-polyfill'

smoothscroll.polyfill()

export default function (App) {
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
}
