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
        },
        query: '',
        queryTag: false
    }

    componentDidMount() {
        this.loadTools();
    }

    displayRemoveModal = (id, name) => {
        this.setState({ 
            toolToRemove: {
                id: id,
                name: name
            }
        });
                
        const { node } = this.state;
        const modal = node.querySelector('.modal-remove-tool');

        node instanceof HTMLElement && modal.classList.toggle('modal-active');
    }

    closeRemoveModal = () => {
        const { node } = this.state;
        const modal = node.querySelector('.modal-remove-tool');

        node instanceof HTMLElement && modal.classList.toggle('modal-active');
    }


    toggleAddModal = () => {
        const { node } = this.state;
        const modal = node.querySelector('.modal-add-tool');

        node instanceof HTMLElement && modal.classList.toggle('modal-active');
    }

    removeTool = async () => {
        await api.delete(`/tools/${this.state.toolToRemove.id}`);
        const response = await api.get('/tools');
        this.setState({ tools: response.data });
        this.closeModal();
    }

    loadTools = async () => {
        const response = await api.get('/tools');
        
        this.setState({ tools: response.data, node: ReactDOM.findDOMNode(this) });
    }

    updateQuery = e => {
        this.setState({
            query: e.target.value
        });
    }

    checkInput = () => {
        const checked = this.state.queryTag === false ? true : false;
        this.setState({ queryTag: checked });
        console.log(this.state.queryTag);
    }

    handleSubmit = async e => {
        e.preventDefault();
        const response = !this.state.queryTag ? await api.get(`/tools/?q=${this.state.query}`) : await api.get(`/tools/?tags_like=${this.state.query}`);
        this.setState({ tools: response.data });
    }

    render() {
        const { tools, toolToRemove } = this.state;

        return (
            <div>
                <form name="search" onSubmit={this.handleSubmit}>
                    <label className="input-search">
                        <input type="text" name="q" value={this.state.query} onChange={this.updateQuery} placeholder="Search..." className="input-required" />
                    </label>
                    <label className="input-checkbox">
                        <input type="checkbox" onChange={this.checkInput} name="tags_like" /> search in tags only
                        <span className="input-checkmark"></span>
                    </label>
                    <button onClick={this.toggleAddModal} className="btn-primary btn-icon-circle"><span>Add</span></button>
                </form>

                {tools.map(tool => (
                    <div key={tool.id} className='modal-large'>
                        <a href={tool.link} target="_blank" rel="noopener noreferrer"><h4>{tool.title}</h4></a>
                        <p>{tool.description}</p>
                        <p className='body-important'>{tool.tags.map(i => { return `#${i} ` })}</p>
                        <button onClick={() => this.displayRemoveModal(tool.id, tool.title)} className='btn-icon-close btn-modal-remove'><span>Remove</span></button>
                    </div>
                ))}

                <div className='modal-background modal-remove-tool'>
                    <div className='modal-remove'>
                        <h4 className='modal-title'>Remove Tool</h4>
                        <p>Are you sure you want to remove <strong>{toolToRemove.name}</strong>?</p>
                        <button className='btn-danger' onClick={this.removeTool}>Yes, remove</button>
                        <button className='btn-secondary' onClick={this.closeRemoveModal}>Cancel</button>
                        <span onClick={this.closeRemoveModal}><img src="/icons/Icon-Close-2px-grey.svg" alt=""></img></span>
                    </div>
                </div>

                <div className='modal-background modal-add-tool'>
                    <div className='modal-add'>
                        <h4 className='modal-title'>Add new Tool</h4>
                        <form name='add-tool'>
                            <input type='text'/>
                        </form>
                        <button className='btn-primary'>Add tool</button>
                        <span onClick={this.toggleAddModal}><img src="/icons/Icon-Close-2px-grey.svg" alt=""></img></span>
                    </div>
                </div>
            </div>
        )
    };
}