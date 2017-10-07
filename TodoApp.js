const {
  InputField,
  TodoHeader,
  TodoList
} = window.App;

const _createTodo = (todos, title) => {
  todos.push({
    // id: todos[todos.length - 1].id + 1, 這裡會爆掉，因為已經沒有上一個 todo 了！
    id: todos[todos.length - 1] ? (todos[todos.length - 1].id + 1) : 0,
    title,
    completed: false
  });
  return todos;
};

const _updateTodo = (todos, id, title) => {
  const target = todos.find((todo) => todo.id === id);
  if (target) target.title = title;
  return todos;
};

const _toggleTodo = (todos, id, completed) => {
  const target = todos.find((todo) => todo.id === id);
  if (target) target.completed = completed;
  return todos;
};

// 將刪除邏輯抽成一個 function
const _deleteTodo = (todos, id) => {
  const idx = todos.findIndex((todo) => todo.id === id);
  if (idx !== -1) todos.splice(idx, 1);
  return todos;
};

class TodoApp extends React.Component {
  constructor(props, context) {
    super(props, context);
    // React 的資料模型分兩種：props、state，
    // 應該盡可能讓底層元件存取資料的方式是使用 props，
    // 所以要將 todos 儲存在上層元件 (TodoApp) 的 state 中。  
    this.state = {
      todos: []
    };
  }

  // 如果要操作實際的 DOM 元素， ex: $('#app').hide();
  // 如果要請求 AJAX，或是設置 timer
  componentDidMount() {
    fetch('./todos.json')
      .then((response) => response.json())
      .then((todos) => this.setState({ todos }));
  }

  updateTodosBy(updateFn) {
    return (...args) => {
      this.setState({
        todos: updateFn(this.state.todos, ...args)
      });
    };
  }

  render() {
    // 從 state 中取得 todos
    const { todos } = this.state;
    return (
      // TodoApp 渲染 InputField 和 TodoList 元件時，傳遞的 callback 結構都長得很相似，則可以重構為：
      <div>
        <TodoHeader
          title="我的待辦清單"
          username="Takeu"
          todoCount={todos.filter((todo) => !todo.completed).length}
        />
        <InputField
          placeholder="新增待辦清單"
          onSubmitEditing={this.updateTodosBy(_createTodo)}
        />
        <TodoList
          todos={todos}
          onUpdateTodo={this.updateTodosBy(_updateTodo)}
          onToggleTodo={this.updateTodosBy(_toggleTodo)}
          onDeleteTodo={this.updateTodosBy(_deleteTodo)}
        />
      </div>
      // <div>
      //   <InputField
      //     placeholder="新增待辦清單"
      //     onSubmitEditing={
      //       (title) => this.setState({
      //         todos: _createTodo(todos, title)
      //       })
      //     }
      //   />
      //   <TodoList ...
      //   onUpdateTodo={
      //     (id, title) => this.setState({
      //       todos: _updateTodo(todos, id, title)
      //     })
      //   }
      //   onToggleTodo={
      //     (id, completed) => this.setState({
      //       todos: _toggleTodo(todos, id, completed)
      //     })
      //   }
      //   onDeleteTodo={
      //     (id) => this.setState({
      //       todos: _deleteTodo(todos, id)
      //     })
      //   }
      //   />
      // </div>
    );
  }
}

window.App.TodoApp = TodoApp;