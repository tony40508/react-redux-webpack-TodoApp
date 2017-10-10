import React, { Component } from 'react';
import { connect } from 'react-redux';

import TodoHeader from './TodoHeader';
// const { connect } = ReactRedux;
// const { TodoHeader } = window.App;

class TodoHeaderContainer extends React.Component {
    render() {
        return (
            <TodoHeader
                title="我的待辦清單"
                username="Takeu"
                todoCount={this.props.todos.filter((todo) => !todo.completed).size}
                // Immutable 的 List 沒有 length 的 properties
                // todoCount={this.props.todos.filter((todo) => !todo.completed).length}
            />
        );
    }
}
export default connect(
    (state) => ({ todos: state.todos }) // 需要先從 Store 取得 todos 
    // 這裡沒有 Action 故不需給 mapDispatchToProps 
)(TodoHeaderContainer);