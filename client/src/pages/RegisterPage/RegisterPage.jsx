import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from '../../actions';
import { HeaderComponent } from '../../components/CommonComponents/HeaderComponent';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.email && user.password) {
            this.props.register(user);
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted, alert } = this.state;
        return (
         <div>
             <HeaderComponent/>
             <div className="row justify-content-md-center">

                 <div className="col-md-4 m-3 mt-2">
                     <h2 className="text-center mt-2">Register</h2>
                     {
                         submitted && alert && alert.message &&
                         <div className={ `alert show ${alert.type}` }  role="alert"> { alert.message }
                             <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                 <span aria-hidden="true">&times;</span>
                             </button>
                         </div>
                     }
                     <form name="form" onSubmit={this.handleSubmit}>
                         <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                             <label htmlFor="firstName">First Name</label>
                             <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                             {submitted && !user.firstName &&
                             <div className="help-block">First Name is required</div>
                             }
                         </div>
                         <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                             <label htmlFor="lastName">Last Name</label>
                             <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                             {submitted && !user.lastName &&
                             <div className="help-block">Last Name is required</div>
                             }
                         </div>
                         <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                             <label htmlFor="email">Email</label>
                             <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                             {submitted && !user.email &&
                             <div className="help-block">Email is required</div>
                             }
                         </div>
                         <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                             <label htmlFor="password">Password</label>
                             <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                             {submitted && !user.password &&
                             <div className="help-block">Password is required</div>
                             }
                         </div>
                         <div className="form-group">
                             <button className="btn btn-primary">Register</button>
                             <Link to="/login" className="btn btn-link">Cancel</Link>
                         </div>
                     </form>
                 </div>
             </div>
         </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    const { alert } = state;
    return { registering, alert };
}

const actionCreators = {
    register: authActions.register
};

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };