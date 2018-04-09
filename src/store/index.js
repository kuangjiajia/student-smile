import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk' //处理异步
import Counter from '../reducer/count/index.js' //引入reducer

//reducer可以引入多个

const reduxDevtools =  window.devToolsExtension ? window.devToolsExtension() : f=> f //唤醒chrome redux插件

const store = createStore(combineReducers({Counter}),compose(
    applyMiddleware(thunk),
    reduxDevtools
))

export { store }

// store的基本配置 如果说要引入新的reducer 则把reducer放在combineReducers中 
// 如果说要引入新的中间件 则放在compose中