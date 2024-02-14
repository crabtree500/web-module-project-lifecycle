import React from 'react';

const Todo = ({ todo, onTodoCheck }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onTodoCheck(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'check' : 'none' }}>
        {todo.name}
      </span>
    </li>
  );
}

export default Todo;
