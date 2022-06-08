import React, { Component } from 'react';
import './TodoListItem.css';
import propTypes from 'prop-types';

export default class TodoListItem extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      label,
      onDeleted,
      onToggleImportant,
      onToggleDone,
      done,
      important,
    } = this.props;

    let classNames = 'todo-list-item';

    if (done) {
      classNames += ' item-done';
    }
    if (important) {
      classNames += ' important';
    }

    return (
      <span className={classNames}>
        <span
          className="todo-list-item-label"
          onClick={onToggleDone}
          role="presentation"
        >
          {label}
        </span>

        <div className="buttons-group">
          <button
            type="submit"
            className="btn btn-outline btn-outline-success btn-sm"
            onClick={onToggleImportant}
          >
            <i className="fa fa-exclamation" />
          </button>
          <button
            type="submit"
            className="btn btn-outline btn-outline-danger btn-sm"
            onClick={onDeleted}
          >
            <i className="fa fa-trash-o" />
          </button>
        </div>
      </span>
    );
  }
}

TodoListItem.propTypes = {
  label: propTypes.string.isRequired,
  onDeleted: propTypes.func.isRequired,
  onToggleImportant: propTypes.func.isRequired,
  onToggleDone: propTypes.func.isRequired,
  done: propTypes.bool,
  important: propTypes.bool,
};

TodoListItem.defaultProps = {
  done: false,
  important: false,
};
