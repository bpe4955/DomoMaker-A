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

const handlePassChange = (e) => {
    e.preventDefault();
    helper.hideError();

    const oldPass = e.target.querySelector('#oldpass').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;

    if (!oldPass || !pass || !pass2) {
        helper.handleError('All fields are required!');
        return false;
    }
    if (pass !== pass2) {
        helper.handleError('Passwords do not match!');
        return false;
    }
    if (oldPass === pass) {
        helper.handleError('All passwords are the same!');
        return false;
    }

    helper.sendPost(e.target.action, { oldPass, pass, pass2 });

    return false;
};



// Functional stateless component for SignupWindow
const ChangePassWindow = (props) => {
    return (
        <div class='mainForm'>
            <h3>Change&nbsp;Password</h3>
        <form action='/changePass' onSubmit={handlePassChange} method='POST'
            name='changePassForm' id='changePassForm'>
            <label htmlFor='currentpass'>Old&nbsp;Pass: </label>
            <input id='oldpass' type='text' name='currentpass' placeholder='Current Pass' />
            <label htmlFor='pass'>Password: </label>
            <input id='pass' type='text' name='pass' placeholder='password' />
            <label htmlFor='pass2'>Password: </label>
            <input id='pass2' type='text' name='pass2' placeholder='retype password' />
            <input type='submit' className='formSubmit' value='Change' />
        </form>
        </div>
    );
};

const init = () => {
    const loginButton = document.querySelector('#loginButton');
    const signupButton = document.querySelector('#signupButton');

    ReactDOM.render(<ChangePassWindow />,
            document.querySelector('#content'));

};

window.onload = init;