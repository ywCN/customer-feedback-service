import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            //http://materializecss.com/navbar.html
            <nav>
                <div className="nav-wrapper>">
                    <a className="left brand-logo">Survey Email</a>
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

export default Header;
