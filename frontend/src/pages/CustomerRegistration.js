import React, { useState } from 'react';
import axios from 'axios';
import '../components/Registration.css';

const CustomerRegistration = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const response = await axios.post('http://localhost:5050/api/v1/users/register', { firstName, lastName, email, password });
           console.log("response",response)

        } catch (err) {
            setError(err.response.data.message || 'Registration failed');
        }
    };

    return (
        <div className="registration-container">
            <h2>Customer Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
    );
};

export default CustomerRegistration;


