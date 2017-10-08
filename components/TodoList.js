const { TodoItem } = window.App;

class TodoList extends React.Component {
    render() {
        const {
            todos,
            onUpdateTodo,
            onToggleTodo,
            onDeleteTodo
        } = this.props;
        // 每個子元件都必須給予唯一的 key，React 根據 key 來辨認元件是屬於哪一筆資料，而確保：
        //     1.資料重新排序時，元件會跟著重新排序，而不是破壞舊元件，以新元件顯示資料
        //     2.資料被刪除時，元件會跟著刪除，而不是留給其他資料使用
        const todoElements = todos.map((todo) => (
            <li key={todo.id}>
                <TodoItem
                    title={todo.title}
                    completed={todo.completed}
                    onUpdate={(content) => onUpdateTodo && onUpdateTodo(todo.id, content)}
                    onToggle={(completed) => onToggleTodo && onToggleTodo(todo.id, completed)}
                    onDelete={() => onDeleteTodo && onDeleteTodo(todo.id)}
                    // 使用 props 傳遞 callback 的好處是，可以不用在底層 view 元件中加入業務邏輯
                    // 筆記：讓view元件職責簡單，只需顯示 props 的資料，和呼叫 props 中相對應的 callback`~`
                />
            </li>
        ));
        return <ul>{todoElements}</ul>
    }
}

TodoList.propTypes = {
    // todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    todos: React.PropTypes.object.isRequired,
    onUpdateTodo: React.PropTypes.func,
    onToggleTodo: React.PropTypes.func,
    onDeleteTodo: React.PropTypes.func
};

window.App.TodoList = TodoList;