import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../context/github/githubContext';

const Search = (props) => {

    const githubContext = useContext(GithubContext);
    /**
     * useState Hook is used to set and change a state variable in Functional Components
     */
    const [text, setText] = useState('');

    /**
     * Add const to functions, as this is no longer a class componenet
     * Functions within functions will have const before them
     */
    const onChange = (e) => setText(e.target.value);

    /**
     * Because this is not a regular form submit, we need to do e.preventDefault()
     */
    const onSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            props.setAlert('Please Enter Something', 'light');
        } else {
            githubContext.searchUsers(text);
            setText('');
        }
    }

    /**
     * Functional components do not require the render() function, 
     * state variables in Functional componenets are not accessed by this.state but by their name
     */
    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input type="text" name='text' onChange={onChange} value={text} placeholder='Search Users....' />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            {githubContext.users.length > 0 && (
                <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>
                    Clear
                </button>
            )}
        </div>
    );

}

Search.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default Search;