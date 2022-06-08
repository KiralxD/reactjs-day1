import React, { Component } from 'react';
import propTypes from 'prop-types';

import './ItemAddForm.css';

export default class ItemAddForm extends Component {
  constructor() {
    super();
    this.state = {
      label: '',
    };
    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      });
    };
    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.addItem(this.state.label);
      this.setState({
        label: '',
      });
    };
  }

  render() {
    return (
      <form className="item-add-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="What needs to be done"
          className="form-control search-input"
          value={this.state.label}
          onChange={this.onLabelChange}
          required
        />
        <button type="submit" className="btn btn-outline-primary btn-md">
          Add Task
        </button>
      </form>
    );
  }
}

ItemAddForm.propTypes = {
  addItem: propTypes.func.isRequired,
};
