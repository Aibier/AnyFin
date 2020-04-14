import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from '../../actions';
import { HeaderComponent } from '../../components/CommonComponents/HeaderComponent';
import { RequiredFieldErrorDiv } from './elements';
// import LoginValidationForm from '../../components/LoginForm';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.logout();
        this.state = {
            email: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    
    handleSubmitLogin(e) {
        e.preventDefault();
        const { email, password } = this.state;
        if (email && password) {
            this.props.login(email, password);
            this.setState({ submitted: true });
        }
    }

    render() {
        const { alert } = this.props;
        const { email, password, submitted } = this.state;
        return (
            <div>
                <HeaderComponent/>
                <div className="row justify-content-md-center">
                    <div className=" col-md-4  m-3 mt-2">
                        <h2 className="mt-2 text-center">Login</h2>
                        {
                            submitted && alert && alert.message &&
                            <div className={ `alert show ${alert.type}` }  role="alert"> { alert.message }
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        }
                        <form name="loginForm">
                            <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                                { submitted && !email &&
                                   <RequiredFieldErrorDiv>Email is required.</RequiredFieldErrorDiv>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                { submitted && !password &&
                                    <RequiredFieldErrorDiv>Password is required.</RequiredFieldErrorDiv>
                                }
                            </div>
                            <div className="form-group">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={event => {
                                        this.handleSubmitLogin(event)
                                    }}
                                >Login</button>
                                <Link to="/register" className="btn btn-link">Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    login: authActions.login,
    logout: authActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };