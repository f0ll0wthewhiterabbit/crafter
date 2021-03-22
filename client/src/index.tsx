import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as StoreProvider } from 'react-redux'
import 'antd/dist/antd.css'

import store from '@/store/store'

const render = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const App = require('@/components/wrappers/App').default

  ReactDOM.render(
    <StoreProvider store={store}>
      <App />
    </StoreProvider>,
    document.getElementById('root')
  )
}

render()

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('@/components/wrappers/App', render)
}
