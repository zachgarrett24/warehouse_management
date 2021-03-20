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
    const [ user, setUser ] = useState({});
    const [ token, setToken ] = useState('')

return (
    <div className="App">
        <Router>
            <h1>Warehouse Manager</h1>
            <Route path="/register">
                <Register user={user} setUser={setUser} token={token} setToken={setToken}/>
            </Route>
            <Route path="/login">
                <Login user={user} setUser={setUser} token={token} setToken={setToken} />
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