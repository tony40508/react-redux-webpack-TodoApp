import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputField from './InputField';
// const { InputField } = window.App;

class TodoItem extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        onUpdate: PropTypes.func,
        onToggle: PropTypes.func,
        onDelete: PropTypes.func
    };
    constructor(props, context) {
        super(props, context);
        this.state = { editable: false };
        // 在 ES6 component class 中，必須手動綁定 this
        this.toggleEditMode = this.toggleEditMode.bind(this); 
    }

    toggleEditMode() {
        this.setState({ editable: !this.state.editable });
    }

    renderViewMode() {
        const {
            title,
            completed,
            onToggle,
            onDelete
        } = this.props;
        // && onDelete()為確保上層元件是否有傳function過來
        return (
            <div>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => onToggle && onToggle(!completed)}
                />
                <span onDoubleClick={this.toggleEditMode}>{title}</span>
                <button onClick={() => onDelete && onDelete()}>x</button> 
            </div>
        );
    }

    renderEditMode() {
        const { title, onUpdate } = this.props;
        return (
            <InputField
                autoFocus
                placeholder="編輯待辦事項"
                value={title}
                onBlur={this.toggleEditMode}
                onKeyDown={(e) => {
                    if (e.keyCode === 27) {
                        e.preventDefault();
                        this.toggleEditMode();
                    }
                }}
                onSubmitEditing={(content) => {
                    onUpdate && onUpdate(content);
                    this.toggleEditMode();
                }}
            />
        );
    }

    render() {
        return this.state.editable ?
            this.renderEditMode() :
            this.renderViewMode();
    }
}
export default TodoItem;
// TodoItem.propTypes = {
//     title: React.PropTypes.string.isRequired,
//     completed: React.PropTypes.bool.isRequired,
//     onUpdate: React.PropTypes.func,
//     onToggle: React.PropTypes.func,
//     onDelete: React.PropTypes.func
// };

// window.App.TodoItem = TodoItem;