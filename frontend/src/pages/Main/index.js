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
        toolToAdd: {
            title: '',
            link: '',
            description: '',
            tags: []
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

        this.closeRemoveModal();
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

    refreshTools = (response) => {
        this.setState({ tools: response.data, node: ReactDOM.findDOMNode(this) }, () => {
            const { node } = this.state;
            const modal = node.querySelectorAll('.modal-large');

            node instanceof HTMLElement && modal.forEach(modal => {
                modal.classList.add('modal-animation');
                setTimeout(() => {
                    modal.classList.remove('modal-animation');
                }, 600);
            });
        });
    }

    removeTool = async () => {
        await api.delete(`/tools/${this.state.toolToRemove.id}`);
        
        const response = await api.get('/tools');
        
        this.refreshTools(response);
        
        this.closeRemoveModal();
    }

    loadTools = async () => {
        const response = await api.get('/tools');
        
        this.refreshTools(response);
    }

    insertTool = e => {
        e.preventDefault();

        const { toolToAdd } = this.state;

        console.log(toolToAdd);

        api.post('/tools', {
            title: e.target[0].value,
            link: e.target[1].value,
            description: e.target[2].value,
            tags: e.target[3].value.split(' ')
        })
        .then(async () => {
            const response = await api.get('/tools');
            this.setState({tools: response.data});
            this.toggleAddModal();
        })
    }

    updateQuery = e => {
        this.setState({
            query: e.target.value
        });
    }

    checkInput = async e => {
        await this.setState({ queryTag: e.target.checked })

        this.handleSubmit();
    }

    handleSubmit = async () => {
        const response = !this.state.queryTag ? await api.get(`/tools/?q=${this.state.query}`) : await api.get(`/tools/?tags_like=${this.state.query}`);

        this.refreshTools(response);
    }

    render() {
        const { tools, toolToRemove } = this.state;

        return (
            <div id="main">
                <div className="inputs-main">
                    <form name="search" onKeyUp={this.handleSubmit} onSubmit={e => { e.preventDefault() }}>
                        <label htmlFor="q" className="input-search"><p>Search</p>
                            <input type="text" name="q" value={this.state.query} onChange={this.updateQuery} tabIndex="0" placeholder="Search..." className="input-required" />
                        </label>
                        <label className="input-checkbox">
                            <input type="checkbox" onChange={this.checkInput} name="tags_like" /> search in tags only
                            <span className="input-checkmark"></span>
                        </label>
                    </form>
                    
                    <button onClick={this.toggleAddModal} className="btn-primary btn-icon-circle"><span>Add</span></button>
                </div>
                
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
                        <form name='add-tool' onSubmit={this.insertTool}>
                            <label htmlFor="title"><p>Tool name</p></label>
                            <input type="text" name="title" className="input-required" required placeholder="Tool name..."/>
                            <label htmlFor="link"><p>Tool link</p></label>
                            <input type="text" name="link" className="input-required" required placeholder="Tool link..."/>
                            <label htmlFor="description"><p>Tool description</p></label>
                            <textarea name="description" className="input-required" required innerref="description" placeholder="Tool description..."></textarea>
                            <label htmlFor="tags"><p>Tool tags</p></label>
                            <input type="text" name="tags" className="input-required" required placeholder="Tags..."/>
                            <button type="submit" className='btn-primary'>Add tool</button>
                        </form>
                        <span onClick={this.toggleAddModal}><img src="/icons/Icon-Close-2px-grey.svg" alt=""></img></span>
                    </div>
                </div>
            </div>
        )
    };
}