export default function TodoItem({
  todo,
  onEditClick,
  onDeleteClick
}) {
  return (
    <li key={todo.id}>
      {todo.text}
      <button onClick={() => onEditClick(todo)}>Edit</button>
      <button onClick={() => onDeleteClick(todo.id)}>Delete</button>
    </li>
  );
}