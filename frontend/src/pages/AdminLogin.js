import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
        setSuccess(''); 
        
        try {
            const response = await axios.post('http://localhost:5050/api/v1/users/adminLogin', { email, password });
            console.log("Login successful:", response);
            localStorage.setItem('token', response.data.token);
            setSuccess('Login successful!');
            navigate('/admin-dashboard'); 
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Login failed');
            } else if (err.request) {
                setError('No response from server. Please check the server and try again.');
            } else {
                setError('Error: ' + err.message);
            }
            console.error("Login error:", err); 
        }
    };

    return (
        <div className="admin-login">
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
