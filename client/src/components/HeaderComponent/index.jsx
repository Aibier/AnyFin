import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class HeaderComponent extends React.Component {
    render() {
        const { user } = this.props;
        let data;
        const divStyle = { width: '100px' };
        data =  <div className="col-md-12">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand" >Home</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/countries" className="nav-link" >Countries</Link>
                        </li>
                    </ul>
                </div>
                {user ?
                    (<div>
                        <a className="" style={divStyle}>Hi {user.user.name}!</a>
                        <Link to="/login" className="btn btn-outline-success my-2 my-sm-0" >Logout</Link>
                    </div>) : (
                        <Link to="/login" className="btn btn-outline-success my-2 my-sm-0" >Login</Link>
                    )
                }

            </nav>
            <hr/>
        </div>

        return data
    }
}

function mapState(state) {
    const { authentication } = state;
    const { user } = authentication;
    return { user };
}

const connectedHeaderComponent = connect(mapState, {})(HeaderComponent);
export { connectedHeaderComponent as HeaderComponent };