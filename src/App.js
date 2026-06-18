import { useState, useEffect } from 'react';

import TodoItem from './TodoItem';
import AddForm from './AddForm';
import EditForm from './EditForm';

export default function App() {

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const [todos, setTodos] = useState(() => {

    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }

  });

  const[todo, setTodo] = useState("");

  useEffect(() => {

    localStorage.setItem("todos", JSON.stringify(todos));

  }, [todos]);


  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim()
        }
      ]);
    }

    setTodo("");

  }

  function handleDeleteTodo(id) {

    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(removeItem);

  }

  function handleEditInputChange(e) {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });

    setIsEditing(false);
    setTodos(updatedItem);

  }

  function handleEditFormSubmit(e) {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  }


  return (
    <div className="App">
      
      {isEditing ? (
        
        <EditForm
          currentTodo={currentTodo}
          setIsEditing={setIsEditing}
          onEditInputChange={handleEditInputChange}
          onEditFormSubmit={handleEditFormSubmit}
        />

      ) : (
        <AddForm
          todo={todo}
          onAddInputChange={handleInputChange}
          onAddFormSubmit={handleFormSubmit}
        />
      )}

        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              todo={todo}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteTodo}
            />
          ))}
        </ul>

    </div>

  );

}