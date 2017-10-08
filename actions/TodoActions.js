const { ActionTypes } = window.App;

window.App.TodoActions = {
    loadTodos() {
        // 當我們遇到非同步的行為時，因為無法立即回傳 action 物件，我們可以回傳其他形式的 action，
        // 如這裡是回傳 thunk 函數，thunk 是將表達式封裝起來為了延遲調用的函數；
        // Redux 提供一種方法叫 applyMiddleware，讓你的 Store 接收到這類型的 action 可以做額外的處理，
        // 如這裡是當 Store 接到 thunk 時才調用，並把 dispatch 函數遞進去。
        return (dispatch) => {
            fetch('./todos.json')
                .then((response) => response.json())
                .then((todos) => dispatch({
                    type: ActionTypes.LOAD_TODOS_SUCCESS,
                    todos
                }));
        };
    },
    createTodo(title) {
        return {
            type: ActionTypes.CREATE_TODO,
            title
        };
    },
    updateTodo(id, title) {
        return {
            type: ActionTypes.UPDATE_TODO,
            id,
            title
        };
    },
    toggleTodo(id, completed) {
        return {
            type: ActionTypes.TOGGLE_TODO,
            id,
            completed
        };
    },
    deleteTodo(id) {
        return {
            type: ActionTypes.DELETE_TODO,
            id
        };
    }
};