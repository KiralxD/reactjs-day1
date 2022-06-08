import React from 'react';
import './AppHeader.css';

const AppHeader = ({ toDo, done }) => (
  <div className="app-header">
    <h1>My Todo List</h1>
    <span className="app-header-counter">
      {toDo} more to do, {done} done
    </span>
  </div>
);

export default AppHeader;
