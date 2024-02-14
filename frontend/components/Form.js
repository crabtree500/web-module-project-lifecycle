import React, { Component } from 'react';
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoText: '',
      message: ''
    };
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { todoText } = this.state;
    const todoid = new Date().toISOString();
    fetch('http://localhost:9000/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: todoid,  name: todoText }),
    })
        .then(() => {
            this.setState({ message: 'Great update' });
            this.props.onAddTodo(); 
            setTimeout(() => {
              this.setState({ message: '' });
          }, 3000);
        })
        .catch(() => this.setState({ message: 'Oopsies' }));

    
    this.setState({ todoText: '' });
}

  handleInputChange = (evt) => {
    this.setState({ todoText: evt.target.value });
  }

  render() {
    const { todoText, message } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            name='name'
            type='text'
            placeholder='Enter your todo here'
            value={todoText}
            onChange={this.handleInputChange}
          />
          <button type='submit'>Add Todo</button>
        </form>
        {message && <div>{message}</div>}
      </div>
    );
  }
}

export default Form;
