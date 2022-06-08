import React from 'react';
import propTypes from 'prop-types';
import TodoListItem from '../TodoListItem/TodoListItem';

import './TodoList.css';

const TodoList = ({ items, onDeleted, onToggleImportant, onToggleDone }) => {
  const elements = items.map(item => (
    <li key={item.id} className="list-group-item">
      <TodoListItem
        label={item.label}
        important={item.important}
        done={item.done}
        onDeleted={() => onDeleted(item.id)}
        onToggleImportant={() => onToggleImportant(item.id)}
        onToggleDone={() => onToggleDone(item.id)}
      />
    </li>
  ));
  return <ul className="list-group todo-list">{elements}</ul>;
};

TodoList.propTypes = {
  items: propTypes.arrayOf(propTypes.shape),
  onDeleted: propTypes.func.isRequired,
  onToggleImportant: propTypes.func.isRequired,
  onToggleDone: propTypes.func.isRequired,
};

TodoList.defaultProps = {
  items: [],
};

export default TodoList;
