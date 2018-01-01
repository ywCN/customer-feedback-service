import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return; // show nothing if not sure
            case false:
                return (
                    <li>
                        <a href="auth/google" />
                    </li>
                );
            default:
                return (
                    <li>
                        <a>Logout</a>
                    </li>
                );
        }
    }

    render() {
        return (
            //http://materializecss.com/navbar.html
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">Survey Service</a>
                    <ul className="right">{this.renderContent()}</ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);
