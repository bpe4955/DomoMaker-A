const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const handleDomo = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const age = e.target.querySelector('#domoAge').value;
    const type = e.target.querySelector('#domoType').value;

    if (!name || !age || !type) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, { name, age, type }, loadDomosFromServer);

    return false;
};

// Functional stateless component for DomoForm
const DomoForm = (props) => {
    return (
        <form action='/maker' onSubmit={handleDomo} method='POST'
            name='domoForm' id='domoForm' className='domoForm'>
            <label htmlFor='name'>Name: </label>
            <input id='domoName' type='text' name='name' placeholder='Domo Name' />
            <label htmlFor='age'>Age: </label>
            <input id='domoAge' type='number' min='0' name='age' />
            <br />
            <label htmlFor='type'>Type: </label>
            <select name="type" id="domoType">
                <option value="normal" selected>Normal</option>
                <option value="real">Real</option>
            </select>
            <input type='submit' className='makeDomoSubmit' value='Make Domo' />
        </form>
    );
};

const DomoList = (props) => {
    if (props.domos.length === 0) {
        return (
            <div className='domoList'>
                <h2 className='emptyDomo'>No Domos Yet!</h2>
            </div>
        );
    }

    const getImage = (domoType) => {
        if (domoType === 'real') {
            return(<img src='/assets/img/realdomoface.jpg' alt='realistic domo face' className='domoFace' />);
        }
        else {
            return(<img src='/assets/img/domoface.jpeg' alt='domo face' className='domoFace' />);
        }
    }

    const domoNodes = props.domos.map(domo => {
        return (
            <div key={domo._id} className='domo'>
                {getImage(domo.type)}
                <h3 className="domoName"> Name: {domo.name}</h3>
                <h3 className="domoAge"> Age: {domo.age}</h3>
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
}

const loadDomosFromServer = async () => {
    const response = await fetch('/getDomos');
    const data = await response.json();
    ReactDOM.render(
        <DomoList domos={data.domos} />,
        document.querySelector('#domos')
    );
};

const init = () => {
    ReactDOM.render(
        <DomoForm />,
        document.querySelector('#makeDomo')
    );

    ReactDOM.render(
        <DomoList domos={[]} />,
        document.querySelector('#domos')
    );

    loadDomosFromServer();
};

window.onload = init;