import React from 'react';

import './styles.css';

const Inputs = () => (
    <form name="search">
        <label className="input-search">
            <input type="text" name="q" placeholder="Search..." className="input-required" />
        </label>
        <label className="input-checkbox">
            <input type="checkbox" name="tags_like" /> search in tags only
            <span className="input-checkmark"></span>
        </label>
        <a href="/" className="btn-primary btn-icon-circle"><span>Add</span></a>
    </form>
);

export default Inputs;