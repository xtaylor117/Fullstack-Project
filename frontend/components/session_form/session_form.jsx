import React from 'react'
import { Link } from 'react-router-dom'

class SessionForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
 
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user).then(this.props.closeModal);
    }

    renderErrors() {
        return (
            <ul>
                {this.props.errors.map((error, i) => (
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return ( 
            <div className="login-form-container">
                <form onSubmit={this.handleSubmit} className="login-form-box">
            <br />
                    <div className="login-form">
                        <br />
                        <label>
                <input type="text"
                                value={this.state.username}
                                onChange={this.update('username')}
                                className={this.props.errors.length ? "errors" : "login-input"}
                                placeholder="Enter Username"
                            />
                        </label>
                        <br />
                        <label>
                <input type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                className={this.props.errors.length ? "errors" : "login-input"}
                                placeholder="Enter Password"
                            />
                        </label>
                        <div className='login-errors'>
                            {this.renderErrors()}
                        </div>
                        <br />
                        <input className="session-submit" type="submit" value={this.props.formType} />
                    </div>
                </form>
            </div>
        );
    }
}

export default SessionForm;