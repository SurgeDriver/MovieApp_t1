import React, { useState } from 'react';
import NewTaskForm from './components/newTaskForm';
import TaskList from './components/taskList';
import Footer from './components/footer';
import { formatDistanceToNow } from 'date-fns';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map((task) => task.id === id? {...task, text: newText} : task))
  }

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onSubmit={addTask} />
      </header>
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
        formatDistanceToNow={formatDistanceToNow}
      />
      <Footer
        activeCount={activeCount}
        currentFilter={filter}
        onFilterChange={setFilter}
        onClearCompleted={clearCompleted}
      />
    </div>
  );
}
