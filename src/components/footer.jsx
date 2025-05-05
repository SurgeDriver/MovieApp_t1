import React from 'react';
import PropTypes from 'prop-types';

export default function Footer({ activeCount, currentFilter, onFilterChange, onClearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{activeCount} items left</span>
      <ul className="filters">
        {['all', 'active', 'completed'].map((filterType) => (
          <li key={filterType}>
            <button
              className={currentFilter === filterType ? 'selected' : ''}
              onClick={() => onFilterChange(filterType)}
            >
              {filterType[0].toUpperCase() + filterType.slice(1)}
            </button>
          </li>
        ))}
      </ul>
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  activeCount: PropTypes.number.isRequired,
  currentFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};
