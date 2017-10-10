import { List, Record } from 'immutable';

import ActionTypes from '../constants/ActionTypes';
// const { List, Record } = Immutable;
// const { ActionTypes } = window.App;

// 將 Todo Model 定義為 Immutable 的 Record
const TodoRecord = Record({
    id: undefined,
    title: undefined,
    completed: false
});

// 將尋找 Todo 清單某筆 Todo 的 index 的邏輯拉出來
const _findIdxById = (todos, id) => todos.findIndex((todo) => todo.id === id);

const _createTodo = (todos, title) => 
    // 不用括弧，因為 push 會 return 
    todos.push(new TodoRecord({ 
        id: todos.last() ? todos.last().id + 1 : 0,
        title,
        completed: false
    }));
// {
//     return [
//         ...todos,
//         {
//             // id: todos[todos.length - 1].id + 1, 這裡會爆掉，因為已經沒有上一個 todo 了！
//             id: todos[todos.length - 1] ? (todos[todos.length - 1].id + 1) : 0,
//             title,
//             completed: false
//         }
//     ];
// };

const _updateTodo = (todos, id, title) => 
    todos.setIn([_findIdxById(todos, id), 'title'], title); // 使用 List 的 setIn() 重構
// {
//     const idx = todos.findIndex((todo) => todo.id === id);
//     if (idx === -1) return todos;

//     const newTodos = [...todos];
//     newTodos[idx] = {
//         ...todos[idx],
//         title
//     };
//     return newTodos;
// };

const _toggleTodo = (todos, id, completed) => 
    todos.setIn([_findIdxById(todos, id), 'completed'], completed);
// {
//     const idx = todos.findIndex((todo) => todo.id === id);
//     if (idx === -1) return todos;

//     const newTodos = [...todos];
//     newTodos[idx] = {
//         ...todos[idx],
//         completed
//     };
//     return newTodos;
// };

const _deleteTodo = (todos, id) => 
    todos.delete(_findIdxById(todos, id)); // 使用 List 的 delete() 重構
// {
//     const idx = todos.findIndex((todo) => todo.id === id);
//     if (idx === -1) return todos;

//     const newTodos = [...todos];
//     newTodos.splice(idx, 1);
//     return newTodos;
// };

// 預設的 state 修改成 new List()
export default (state = new List(), action) => {
    // break 的意思是：結束 switch 的執行，跳離 switch 區塊，然後執行下面的程式。
    // return 的意思是：結束 switch 的執行，跳離 switch 區塊，並把值回傳給 "呼叫函式的人"。
    switch (action.type) {
        case ActionTypes.LOAD_TODOS_SUCCESS:
            // 將 todos 陣列轉換為 Immutable的 List
            return new List(action.todos).map((todo) => new TodoRecord(todo)); 
            // return action.todos;
        case ActionTypes.CREATE_TODO:
            return _createTodo(state, action.title);
        case ActionTypes.UPDATE_TODO:
            return _updateTodo(state, action.id, action.title);
        case ActionTypes.TOGGLE_TODO:
            return _toggleTodo(state, action.id, action.completed);
        case ActionTypes.DELETE_TODO:
            return _deleteTodo(state, action.id);
        default:
            return state;
    }
};