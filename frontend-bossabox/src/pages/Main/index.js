import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import api from '../../services/api';

import './styles.css';

export default class Main extends Component {
    state = {
        tools: [],
        node: '',
        toolToRemove: {
            id: undefined,
            name: ''
        }
    };

    componentDidMount() {
        this.loadTools();
    };

    displayModal = (id, name) => {
        this.setState({ 
            toolToRemove: {
                id: id,
                name: name
            }
        });
                
        const { node } = this.state;

        if (node instanceof HTMLElement) {
            const modal = node.querySelector('.modal-background');
            modal.style.visibility = 'visible';
            modal.style.opacity = 1;
        }
    };

    closeModal = () => {
        const { node } = this.state;

        if (node instanceof HTMLElement) {
            const modal = node.querySelector('.modal-background');
            modal.style.opacity = 0;
            modal.style.visibility = 'hidden';
        }
    }

    removeTool = async () => {
        await api.delete(`/tools/${this.state.toolToRemove.id}`)
            .then(window.location.reload());
    }

    loadTools = async () => {
        const response = await api.get('/tools');
        
        this.setState({ tools: response.data, node: ReactDOM.findDOMNode(this) });
    };

    render() {
        const { tools, toolToRemove } = this.state;

        return (
            <div>
                {tools.map(tool => (
                    <div key={tool.id} className='modal-large'>
                        <a href={tool.link} target="_blank" rel="noopener noreferrer"><h4>{tool.title}</h4></a>
                        <p>{tool.description}</p>
                        <p className='body-important'>{tool.tags.map(i => { return `#${i} ` })}</p>
                        <button onClick={() => this.displayModal(tool.id, tool.title)} className='btn-icon-close btn-modal-remove'><span>Remove</span></button>
                    </div>
                ))}

                <div className='modal-background'>
                    <div className='modal-remove'>
                        <h4 className='modal-title'>Remove Tool</h4>
                        <p>Are you sure you want to remove <strong>{toolToRemove.name}</strong>?</p>
                        <button className='btn-danger' onClick={this.removeTool}>Yes, remove</button>
                        <button className='btn-secondary' onClick={this.closeModal}>Cancel</button>
                        <span onClick={this.closeModal}><img src="/icons/Icon-Close-2px-grey.svg" alt=""></img></span>
                    </div>
                </div>
            </div>
        )
    };
}