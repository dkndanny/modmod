import { CREATE_TODO, EDIT_TODO, DELETE_TODO } from '../contants/actionTypes';

function createTodo(_id, text) {
    return {
        type: CREATE_TODO,
        _id,
        text,
        date: Date.now()
    };
}

function editTodo(_id, text) {
    return {
        type: EDIT_TODO,
        _id,
        text,
        date: Date.now()
    };
}

function deleteTodo(_id) {
    return {
        type: DELETE_TODO,
        _id
    };
}

// TODO
// Temp helper
function jsonCallHelper(url, json) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(json)
        }).then(res => res.json())
        .then(json => resolve(json))
        .catch(err => reject(err));
    });
}

export function createTodoDb(text) {
    return (dispatch, getState) => {
        jsonCallHelper('/todo/create', {
            "text": text
        }).then(json => {
            if (json.success) {
                const { _id, text } = json.todo;
                return dispatch(createTodo(_id, text));
            } else {
                return Promise.resolve();
            }
        });
    };
}

export function editTodoDb(_id, text) {
    return (dispatch, getState) => {
        jsonCallHelper('/todo/edit', {
            "_id": _id,
            "text": text
        }).then(json => {
            if (json.success) {
                return dispatch(editTodo(_id, text));
            } else {
                return Promise.resolve();
            }
        });
    };
}

export function deleteTodoDb(_id) {
    return (dispatch, getState) => {
        jsonCallHelper('/todo/delete', {
            "_id": _id
        }).then(json => {
            if (json.success) {
                return dispatch(deleteTodo(_id));
            } else {
                return Promise.resolve();
            }
        });
    };
}
