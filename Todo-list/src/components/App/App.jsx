import React, { Component } from 'react';

import TodoList from '../TodoList';
import SearchPanel from '../SearchPanel/SearchPanel';
import AppHeader from '../AppHeader/AppHeader';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';

import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      todoData: [
        { id: 1, label: 'Drink Coffee', important: false, done: false },
        { id: 2, label: 'Make break', important: true, done: false },
        { id: 3, label: 'Create app', important: false, done: false },
      ],
      term: '',
      filter: 'all', // all, active, done
    };

    let maxId = 100;

    this.addItem = (text) => {
      // generate new item with unique id
      const newItem = {
        id: maxId++,
        label: text,
        important: false,
      };

      this.setState(({ todoData }) => {
        const newArr = [...todoData, newItem];

        return {
          todoData: newArr,
        };
      });
    };

    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex(el => el.id === id);
        const newArray = [
          ...todoData.slice(0, idx),
          ...todoData.slice(idx + 1),
        ];

        return {
          todoData: newArray,
        };
      });
    };

    this.toggleProperty = (arr, id, propName) => {
      // find Item in the data
      const idx = arr.findIndex(el => el.id === id);
      const oldItem = arr[idx];
      // create new item with updated val
      const newItem = { ...oldItem, [propName]: !oldItem[propName] };
      // create new array with new item (delete old item and add new item)
      return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    };

    this.onToggleImportant = (id) => {
      this.setState(({ todoData }) => ({
        todoData: this.toggleProperty(todoData, id, 'important'),
      }));
    };

    this.onToggleDone = (id) => {
      this.setState(({ todoData }) => ({
        todoData: this.toggleProperty(todoData, id, 'done'),
      }));
    };

    this.onSearchChange = term => this.setState({ term });

    this.search = (items, term) => {
      if (term.length === 0) {
        return items;
      }
      return items.filter(
        item => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
      );
    };

    this.filter = (items, filter) => {
      switch (filter) {
        case 'all':
          return items;
        case 'active':
          return items.filter(item => !item.done);
        case 'done':
          return items.filter(item => item.done);
        default:
          return items;
      }
    };

    this.onFilterChange = filter => this.setState({ filter });
  }

  render() {
    const { todoData, term, filter } = this.state;
    const visibleTodoDate = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.filter(el => !el.done).length;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList
          items={visibleTodoDate}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          onDeleted={this.deleteItem}
        />
        <ItemAddForm addItem={this.addItem} />
      </div>
    );
  }
}
