import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return; // show nothing if not sure
            case false:
                return (
                    <li>
                        <a href="auth/google">Login With Google</a>
                    </li>
                );
            default:
                return [
                    <li key="1">
                        <Payments />
                    </li>,
                    <li key="3" style={{ margin: '0 10px' }}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="2">
                        <a href="/api/logout">Logout</a>
                    </li>
                ];
        }
    }

    render() {
        return (
            //http://materializecss.com/navbar.html
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth ? '/surveys' : '/'}
                        className="left brand-logo"
                    >
                        Survey Service
                    </Link>
                    <ul className="right">{this.renderContent()}</ul>
                </div>
            </nav>
        );
    }
}

// without ES6 refactoring
// The state is the one big state of Redux.
// The state.auth property controlled by reducers/authReducer.js
// function mapStateToProps(state) {
//     return { auth: state.auth };
// }

// ES6 refactoring
// destructuring the one state object of Redux
function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);
