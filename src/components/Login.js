import React, {useState} from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const logIn = async ({username, password}) => {
        try {
            const response = await axios.post(`${ BASE_URL }/api/users/login`, {username, password})
            console.log('response:', response);
            if(response){
                setUsername('');
                setPassword('');
                // setToken(response.data.token);
                // const user = await callApi({token: response.data.token, url: '/api/users/me'});
                // if(user && user.username) {
                //     setUser(user);
                //     storeCurrentUser(user);
                // }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("submitted");

        logIn({username, password});

    }


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