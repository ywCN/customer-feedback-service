import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return 'logging in';
            case false:
                return 'logged out';
            default:
                return 'logged in';
        }
    }

    render() {
        return (
            //http://materializecss.com/navbar.html
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">Survey Service</a>
                    <ul className="right">
                        <li>
                            <a>Login With Google</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);
