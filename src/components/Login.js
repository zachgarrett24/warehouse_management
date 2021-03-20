import React, {useState} from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'

const Login = (props) => {
    const { user, setUser, token, setToken } = props
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const logIn = async ({username, password}) => {
        try {
            const response = await axios.post(`${ BASE_URL }/api/users/login`, {username, password})
            if(response){
                setUsername('');
                setPassword('');
                setToken(response.data.token)
                const auth = {
                    headers: {'Authorization': `Bearer ${response.data.token}`
                    }
                }
                const loggedUser = await axios.get(`${BASE_URL}/api/users/me`, auth)
                console.log("the uer:", loggedUser)
                if(loggedUser && loggedUser.data.username) {
                    setUser(loggedUser.data);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        logIn({username, password});
    }
    console.log('token:', token)
    return (
        <div className="wrapperLogin">
            <div className="formWrapper">
                <h2 className="formTitle">Please Login</h2>
                <form className="loginForm" onSubmit={handleLogin}>
                    <div className="usernameWrapper">
                    <input type="text" placeholder={'username'} value={username} onChange={(event) => setUsername(event.target.value)} />
                    </div>
                    <div className="passwordWrapper">
                    <input type="password" placeholder={'password'} value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div className="loginButtonWrapper">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )

};

export default Login;