import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class HeaderComponent extends React.Component {
    render() {
        const { user } = this.props;
        let data;
        const divStyle = { width: '100px', paddingRight: '10px' };
        data =  <div className="col-md-12 header_container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand" >Home</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                    </ul>
                </div>
                {user && user.user ?
                    (<div>
                        <a className="" style={divStyle}>Hi {user.user.name}!</a>
                        <Link to="/login" className="btn btn-outline-success my-2 my-sm-0" >Singout</Link>
                    </div>) : (
                        <Link to="/login" className="btn btn-outline-success my-2 my-sm-0" >Signin</Link>
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