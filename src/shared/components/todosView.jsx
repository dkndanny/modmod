import React from 'react';

export default class TodosView extends React.Component {
    handleDelete = e => {
        const _id = e.target.dataset.id;

        this.props.deleteTodoDb(_id);
    }

    handleEdit = e => {
        const _id = e.target.dataset.id;
        const val = this.props.todos.get(_id).text;

        let newVal = window.prompt('', val);
        this.props.editTodoDb(_id, newVal);
    }

    render() {
        let todos = [];
        this.props.todos.forEach((todo, _id) => {
            todos.push(
                <div key={_id}>
                    <span>{todo}</span>
                    <button data-id={_id} onClick={this.handleDelete}>
                        Delete
                    </button>
                    <button data-id={_id} onClick={this.handleEdit}>
                        Edit
                    </button>
                </div>
            );
        })
        return (
            <div id="todo-list">
                {todos}
            </div>
        );
    }
}
