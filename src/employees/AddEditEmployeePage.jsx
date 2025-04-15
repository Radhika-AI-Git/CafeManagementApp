import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddEditEmployeePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email_address: '', phone_number: '', gender: 'Male', cafe_id: '' });
    const [cafes, setCafes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5222/api/employee').then((res) => setCafes(res.data));
        if (id) axios.get(`http://localhost:5222/api/employee/${id}`).then((res) => setForm(res.data));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
         

           
            if (id) {
                // Update existing employee
                await axios.put(`http://localhost:5222/api/employee/${id}`, JSON.stringify(form), config);
            } else {
                // Create new employee
                await axios.post('http://localhost:5222/api/employee', JSON.stringify(form), config);
            }
            navigate('/employees');
        } catch (error) {
            console.error('Failed to submit employee form:', error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <h2>{id ? 'Edit Employee' : 'Add New Employee'}</h2>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required minLength={6} maxLength={10} />
            </div>
            <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input type="email" name="email_address" className="form-control" value={form.email_address} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input type="text" name="phone_number" className="form-control" value={form.phone_number} onChange={handleChange} pattern="[89][0-9]{7}" required />
            </div>
            <div className="mb-3">
                <label className="form-label">Gender</label><br />
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" value="Male" checked={form.gender === 'Male'} onChange={handleChange} />
                    <label className="form-check-label">Male</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" value="Female" checked={form.gender === 'Female'} onChange={handleChange} />
                    <label className="form-check-label">Female</label>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Assigned Cafe</label>
                <select name="cafe_id" className="form-select" value={form.cafe_id} onChange={handleChange} required>
                    <option value="">Select Cafe</option>
                    {cafes.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>
            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/employees')}>Cancel</button>
            </div>
        </form>
    );
};

export default AddEditEmployeePage;
