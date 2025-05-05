import React from 'react';
import PropTypes from 'prop-types';
import Task from './task';

export default function TaskList({ tasks, onToggle, onDelete, onEdit, formatDistanceToNow }) {
  return (
    <section className="main">
      <ul className="todo-list">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            formatDistanceToNow={formatDistanceToNow}
          />
        ))}
      </ul>
    </section>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  formatDistanceToNow: PropTypes.func.isRequired,
};