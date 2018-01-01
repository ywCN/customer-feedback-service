import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from '../actions';

import Header from './Header';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends Component {
    // willmount may be called multiple times,
    // so didmount is a good place to make initial AJAX requests
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        // the outside div is for CSS
        return (
            <div className="container">
                {/* BrowserRouter can have at most 1 child. */}
                <BrowserRouter>
                    <div>
                        {/* Header will always display because it is not in Route. */}
                        <Header />
                        {/* "/" is the root Route 
                        exact={true} can be shortened as exact */}
                        <Route exact path="/" component={Landing} />
                        {/* "/surveys" contains "/", so Landing will display without exact*/}
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);
