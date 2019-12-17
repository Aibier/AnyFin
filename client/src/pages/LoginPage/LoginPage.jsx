import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from '../../actions';
import { HeaderComponent } from '../../components/CommonComponents/HeaderComponent';
import { RequiredFieldErrorDiv } from './elements';


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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            this.props.login(email, password);
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
                        <form name="form" onSubmit={this.handleSubmit}>
                            {
                                submitted && alert && alert.message &&
                                <div className={ `alert show ${alert.type}` }  role="alert"> { alert.message }
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            }
                            <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                                {submitted && !email &&
                                <RequiredFieldErrorDiv>Email is required.</RequiredFieldErrorDiv>
                                }
                            </div>
                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                {submitted && !password &&
                                    <RequiredFieldErrorDiv>Password is required.</RequiredFieldErrorDiv>
                                }
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary">Signin</button>
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