import React, { useState, useEffect } from 'react';

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import {
    Login,
    Register,
    Search,
    Create
} from './index'

const App = () => {

return (
    <div className="App">
        <Router>
            <h1>Warehouse Manager</h1>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/search">
                <Search />
            </Route>
            <Route path="/create">
                <Create />
            </Route>
        </Router>
    </div>
)
}

export default App;