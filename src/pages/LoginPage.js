import React, { useState } from 'react';
import { login } from '../api/AuthService';

/**
 * Login page
 */
const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(credentials);
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '300px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input type="text" className="form-control form-control-sm" id="username" name="username" value={credentials.username} onChange={handleChange} placeholder="Enter your username" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" className="form-control form-control-sm" id="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Enter your password" required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm d-block mx-auto">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
