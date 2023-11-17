
import { useState } from 'react';
import './App.css';

function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    setTodos((currenttodos) => {
      return [
        ...currenttodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ]
    })

    setNewItem("");
  }

  function toggleTodo(id, completed) {
    setTodos((currenttodos) => {
      return currenttodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo;
      });
    })
  }

  function deleteTodo(id) {
    setTodos((currenttodos) => {
      return currenttodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <div className="App">
      <form className='new-item-form' onSubmit={handleSubmit}>
        <div className='form-row'>
          <label htmlFor='item'>New Item</label>
          <input type='text' id='item' value={newItem} onChange={(e) => setNewItem(e.target.value)} />
        </div>
        <button className='btn'>Add</button>
      </form>
      <h1 className='header'>To Do List</h1>
      <ul className='list'>
        {todos.length === 0 && "no todo"}
        {todos.map((todo) => {
          return <li key={todo.id}>
            <label>
              <input type='checkbox' checked={todo.completed} onChange={(e) => toggleTodo(todo.id, e.target.checked)} />
              {todo.title}
            </label>
            <button className='btn btn-danger' onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        })}
      </ul>
    </div>
  );
}

export default App;
