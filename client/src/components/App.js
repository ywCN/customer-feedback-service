import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const Header = () => <h2>Header</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => {
    // the outside div is for CSS
    return (
        <div>
            {/* BrowserRouter can have at most 1 child. */}
            <BrowserRouter>
                <div>
                    {/* "/" is the root Route */}
                    <Route exact={true} path="/" component={Landing} />
                    {/* "/surveys" contains "/", so Landing will display without exact*/}
                    <Route path="/surveys" component={Dashboard} />
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
