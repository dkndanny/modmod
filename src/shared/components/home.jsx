import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TodosView from './todosView';
import TodosForm from './todosForm';
import * as TodoActions from '../actions/todoActions';

@connect(state => ({
    todos: state.todos
}))
export default class Home extends React.Component {
    render() {
        const { todos, dispatch } = this.props;

        return (
            <div id="todo-list">
                <TodosView todos={todos}
                    {...bindActionCreators(TodoActions, dispatch)} />
                <TodosForm
                    {...bindActionCreators(TodoActions, dispatch)} />
            </div>
        );
    }
}
