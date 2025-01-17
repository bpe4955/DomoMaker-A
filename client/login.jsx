const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;

    if (!username || !pass) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass });

    return false;
};

const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;

    if (!username || !pass || !pass2) {
        helper.handleError('All fields are required!');
        return false;
    }
    if (pass !== pass2) {
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass, pass2 });

    return false;
};

// Functional stateless component for LoginWindow
const LoginWindow = (props) => {
    return (
        <form action='/login' onSubmit={handleLogin} method='POST'
            name='loginForm' id='loginForm' className='mainForm'>
            <label htmlFor='username'>Username: </label>
            <input id='user' type='text' name='username' placeholder='username' />
            <label htmlFor='pass'>Password: </label>
            <input id='pass' type='text' name='pass' placeholder='password' />
            <input type='submit' className='formSubmit' value='Sign in' />
        </form>
    );
};

// Functional stateless component for SignupWindow
const SignupWindow = (props) => {
    return (
        <form action='/signup' onSubmit={handleSignup} method='POST'
            name='signupForm' id='signupForm' className='mainForm'>
            <label htmlFor='username'>Username: </label>
            <input id='user' type='text' name='username' placeholder='username' />
            <label htmlFor='pass'>Password: </label>
            <input id='pass' type='text' name='pass' placeholder='password' />
            <label htmlFor='pass2'>Password: </label>
            <input id='pass2' type='text' name='pass2' placeholder='retype password' />
            <input type='submit' className='formSubmit' value='Sign in' />
        </form>
    );
};

const init = () => {
    const loginButton = document.querySelector('#loginButton');
    const signupButton = document.querySelector('#signupButton');

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<LoginWindow />,
            document.querySelector('#content'));
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<SignupWindow />,
            document.querySelector('#content'));
        return false;
    });


    ReactDOM.render(<LoginWindow />,
        document.querySelector('#content'));
};

window.onload = init;