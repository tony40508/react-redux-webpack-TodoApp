const { connect } = ReactRedux;

const {
  TodoActions,
    TodoList
} = window.App;

class TodoListContainer extends React.Component {
    render() {
        const {
            todos,
            updateTodo,
            toggleTodo,
            deleteTodo
        } = this.props;
        return (
            <TodoList
                todos={todos}
                onUpdateTodo={updateTodo}
                onToggleTodo={toggleTodo}
                onDeleteTodo={deleteTodo}
            />
        );
    }
}

window.App.TodoListContainer = connect(
    (state) => ({ todos: state.todos }), // mapStateToProps: 把 state 資料掛到元件的 props
    { // mapDispatchToProps: 把遞進來的 action 包成一個 dispatch 函式，並掛到元件的 props
        updateTodo: TodoActions.updateTodo,
        toggleTodo: TodoActions.toggleTodo,
        deleteTodo: TodoActions.deleteTodo
    }
)(TodoListContainer);
