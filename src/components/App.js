import React from 'react';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import {
    Login
} from './index'

const App = () => {
return (
    <div className="App">
        <Router>
            <h1>Hello World</h1>
            <Login />
        </Router>
    </div>
)
}

export default App;