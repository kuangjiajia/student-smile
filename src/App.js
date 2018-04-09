import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Root from './router/index.js'
import { store } from './store/index.js'

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </Provider>
)

export default App