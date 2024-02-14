// App.js
import React, { Component } from 'react';
import Form from './Form';
import TodoList from './TodoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      message: ''
    };
  }

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = () => {
    fetch('http://localhost:9000/api/todos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        return response.json();
      })
      .then(data => {
        if (data.message === "Here are your Todos") {
          this.setState({
            todos: data.data,
            message: 'Todos fetched successfully'
          });
        } else {
          throw new Error(data.message);
        }
      })
      .catch(error => {
        this.setState({ message: error.message });
      });
  }

  handleTodoCheck = (id) => {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    this.setState({ todos: updatedTodos });
  }

  handleClearCompleted = () => {
    const filteredTodos = this.state.todos.filter(todo => !todo.completed);
    this.setState({ todos: filteredTodos });
  }

  render() {
    const { todos, message } = this.state;

    return (
      <div>
        <h1>{message}</h1>
        <Form fetchTodos={this.fetchTodos} />
        <TodoList
          todos={todos}
          onTodoCheck={this.handleTodoCheck}
          clearCompleted={this.handleClearCompleted}
        />
      </div>
    );
  }
}

export default App;

