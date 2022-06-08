import React, { Component } from 'react';
import propTypes from 'prop-types';

import './SearchPanel.css';

export default class SearchPanel extends Component {
  constructor() {
    super();
    this.state = {
      term: '',
    };

    this.onSearchChange = (e) => {
      const term = e.target.value;
      this.setState({ term });
      this.props.onSearchChange(term);
    };
  }

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="type to search"
        value={this.state.term}
        onChange={this.onSearchChange}
      />
    );
  }
}

SearchPanel.propTypes = {
  onSearchChange: propTypes.func.isRequired,
};
