import React, { Component } from 'react';
import { connect } from 'react-redux';

import InputField from './InputField';
import TodoActions from '../actions/TodoActions';
// const { connect } = ReactRedux;

// const {
//     TodoActions,
//     InputField,
// } = window.App;

class CreateTodoFieldContainer extends React.Component {
    render() {
        return (
            <InputField
                placeholder="新增待辦清單"
                onSubmitEditing={this.props.createTodo} 
                // createTodo 函數改由父元件來的props，原本是 TodoActions.createTodo
            />
        );
    }
}
// 使用 connect() 回傳的函數讓 Container 轉成另外一新元件 (Higher-order Component)
export default connect(  
    // 第一個參數是 mapStateToProps，這裡不需要從 Store 中取資料，所以給 undefined
    undefined, 
    {   // 第二個參數是 mapDispatchToProps，可以直接給 Action Creator 函數名稱，並定義鍵值為 props 的屬性名稱
        createTodo: TodoActions.createTodo // 調用 Action Creator 和 dispatch action 物件
    }
)(CreateTodoFieldContainer);

