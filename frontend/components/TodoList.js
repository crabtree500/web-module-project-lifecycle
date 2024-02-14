import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, onTodoCheck, clearCompleted }) => {
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} onTodoCheck={onTodoCheck} />
        ))}
      </ul>
      <button onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
}

export default TodoList;
