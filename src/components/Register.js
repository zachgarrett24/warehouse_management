import React, {useState} from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000'

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');

    const signUp = async ({username, password}) => {
        try {
            const response = await axios.post(`${ BASE_URL }/api/users/register`, {username, password, name, company})
            console.log('response:', response);
            if(response){
                setUsername('');
                setPassword('');
                setName('');
                setCompany('');
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

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("submitted");

        signUp({username, password, name, company});

    }


    return (
        <div className="wrapperReg">
            <div className="formWrapper">
                <h2 className="formTitle">Create an account</h2>
                <form className="regForm" onSubmit={handleRegister}>
                    <div className="nameWrapper">
                        <input type="text" placeholder={'name'} value={name} onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className="companyWrapper">
                        <input type="text" placeholder={'company'} value={company} onChange={(event) => setCompany(event.target.value)} />
                    </div>
                    <div className="usernameWrapper">
                        <input type="text" placeholder={'username'} value={username} onChange={(event) => setUsername(event.target.value)} />
                    </div>
                    <div className="passwordWrapper">
                        <input type="password" placeholder={'password'} value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div className="regButtonWrapper">
                        <button type="submit">Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    )

};

export default Register;