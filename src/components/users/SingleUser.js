import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Repos from '../Repos/Repos';
import GithubContext from '../context/github/githubContext';

const SingleUser = (props) => {

    const githubContext = useContext(GithubContext);

    const { getUser, loading, user } = githubContext;
    /**
     * useEffect Hooks has the same functionality as componentdidmount()
     * but useEffect will run on every single update, that is why we provided [] at the end
     * [] can be used to tell useEffect what changes to look for
     */
    useEffect(() => {
        // this.params.match.params.login will return the login parameter passed in the url
        getUser(props.match.params.login);
        githubContext.getUserRepos(props.match.params.login);
        // eslint-disable-next-line
    }, []
    )

    /**
     * Destructuring components
     */
    const {
        name, avatar_url, location, bio, company, blog, login, html_url, followers, following, public_repos, public_gists, hireable
    } = user;

    const { repos } = githubContext;

    if (loading) return <Spinner />
    return (<Fragment>
        <Link to='/' className='btn btn-light'>
            Back to Search
            </Link>
            Hireable: {' '}
        {hireable ? (<i className='fas fa-check text-success' />) : (<i className='fas fa-times-circle text danger' />)}
        <div className='card grid-2'>
            <div className='all-center'>
                <img src={avatar_url}
                    className='round-img'
                    alt=''
                    style={{ width: '150px' }}
                />
                <h1>{name}</h1>
                <p>Location: {location}</p>
            </div>
            <div>
                {bio && (
                    <Fragment>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                    </Fragment>
                )}
                <a href={html_url} className='btn btn-dark my-1'>Visit Github Profile</a>
                <ul>
                    <li>
                        {login && <Fragment>
                            <strong>Username: </strong> {login}
                        </Fragment>
                        }
                    </li>
                    <li>
                        {company && <Fragment>
                            <strong>Comapny: </strong> {company}
                        </Fragment>
                        }
                    </li>
                    <li>
                        {blog && <Fragment>
                            <strong>Website: </strong> {blog}
                        </Fragment>
                        }
                    </li>
                </ul>
            </div>
        </div>
        <div className='card text-center'>
            <div className='badge badge-primary'>Followers: {followers}</div>
            <div className='badge badge-success'>Following: {following}</div>
            <div className='badge badge-light'>Public Repos: {public_repos}</div>
            <div className='badge badge-dark'>Public Gists: {public_gists}</div>
        </div>
        <Repos repos={repos} />
    </Fragment>)
}

SingleUser.propTypes = {
    getUserRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired
}

export default SingleUser;