// const { createStore, combineReducers, applyMiddleware } = Redux;
// const { Provider } = ReactRedux;
// const { TodoApp, reducers } = window.App;
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import TodoApp from './components/TodoApp';
import reducers from './reducers';
// 問題：
// 1. Store 接到 action 會調用 reducer，但是 reducer 只接物件不接函數呀！
// 2. thunk 函數什麼時候該被調用呢？

// 如果我們可以改變原本 store.dispatch 的行為，如：
//     1. 讓 Store 在調用 reducer 前，先判斷 action 是否為 thunk，是的話就調用
//     2. 讓 Store 在調用 reducer 前，先將 action 物件紀錄下來
// 像這類型需求，Redux 提供 Middleware 讓我們可以動態擴充 dispatch 行為來達到。

// Middleware 讓你可以在 action 傳遞到 reducer 前做一些事情，例如：
//     1. 判斷 action 型別，做不一樣的事情
//     2.紀錄應用程式中發生的所有 action

// Middleware 的目的是在 dispatch 前做一些事情，所以我們必須在最後回傳新的 dispatch 函數，讓它：
//     1. 可以在做完事情後，調用下一個 Middleware 的 nextDispatch 處理
//     2. 可以根據不同狀況，重新調用 dispatch
//     3. 可以根據不同狀況，調用多次 dispatch 或 nextDispatch，或是直接吃掉該 action 而不往下傳遞
const thunkMiddleware = ({ dispatch, getState }) => {
    return (next) => (action) => {
        // 判斷 action 是否為 thunk function，是的話執行它，並將 dispatch 函數傳進去
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }
        // 如果 action 不是 thunk，將 action 交給下一個 middleware
        return next(action);
    };
};

const composedReducer = combineReducers(reducers);
const store = createStore(
    composedReducer,
    // 1. 將 middleware 依序傳遞進 applyMiddleware
    // 2. 將回傳的 enhancer 函數傳遞給 createStore
    // 一支 Middleware 通常會只做一件事情，所以 Redux 可以根據需求組合及排序多支 Middlewares 
    // (傳到最後為：store.dispatch)
    applyMiddleware(thunkMiddleware)
);

const rootEl = document.getElementById('app');

ReactDOM.render(
    // 使用 Provider 元件包覆 TodoApp，並傳遞 store 實例進去
    // 所以 TodoApp 下所有元件，皆可透過 connect 連結到 store 的資料
    <AppContainer>
        <Provider store={store}>
            <TodoApp />
        </Provider>
    </AppContainer>,
    rootEl
);

// 加入 hot reload 的程式，並且判斷只有 development 會執行
if (module.hot) {
    module.hot.accept(
        './reducers',
        () => store.replaceReducer(combineReducers(require('./reducers').default))
    );

    module.hot.accept(
        './components/TodoApp',
        () => {
            const NextApp = require('./components/TodoApp').default;
            ReactDOM.render(
                <AppContainer>
                    <Provider store={store}>
                        <NextApp />
                    </Provider>
                </AppContainer>,
                rootEl
            );
        }
    );
}