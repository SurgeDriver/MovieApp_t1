import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Task({ task, onToggle, onDelete, onEdit, formatDistanceToNow }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEditClick = () => {
    if (!task.completed) {
      setEditing(true);
      setEditText(task.text);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(task.id, editText);
    setEditing(false);
  };

  return (
    <li className={`${task.completed ? 'completed' : ''} ${editing ? 'editing' : ''}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <label>
          <span className="description">{task.text}</span>
          <span className="created">
            created {formatDistanceToNow(task.createdAt, { addSuffix: true })}
          </span>
        </label>
        <button className="icon icon-edit" onClick={handleEditClick} />
        <button className="icon icon-destroy" onClick={() => onDelete(task.id)} />
      </div>
      {editing && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="edit"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        </form>
      )}
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  formatDistanceToNow: PropTypes.func.isRequired,
};