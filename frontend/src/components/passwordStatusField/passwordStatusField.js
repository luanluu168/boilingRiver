import React from 'react';

class PasswordStatusField extends React.Component {
    state = {
        showPasswordStatus: false
    }

    handleShowPassword = () => {
        let previousState = this.state.showPasswordStatus;
        this.setState({showPasswordStatus: !previousState});
    }

    render() {
        return (
            <div>
                <input type={this.state.showPasswordStatus ? 'text' : 'password'} className="form-control" name={this.props.name} placeholder="Password" required/>
                { !this.state.showPasswordStatus && <span onClick={() => this.handleShowPassword()}><i className="fa fa-eye password-field-status-icon" aria-hidden="true" ></i></span> }
                {  this.state.showPasswordStatus && <span onClick={() => this.handleShowPassword()}><i className="fa fa-eye-slash password-field-status-icon" aria-hidden="true" ></i></span> }
            </div>
        );
    }
}

export default PasswordStatusField;