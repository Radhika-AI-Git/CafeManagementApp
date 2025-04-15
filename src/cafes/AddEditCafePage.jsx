import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddEditCafePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        id: '',
        name: '',
        description: '',
        logo: '',
        location: '',
        employees: [],
    });

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCafe = async () => {
            if (id) {
                setLoading(true);
                try {
                    const res = await axios.get(`http://localhost:5222/api/Cafe/${id}`);
                    console.log("Fetched cafe:", res.data);
                    const data = res.data || {};
                    console.log("Fetched cafe:", data.name);
                    setForm({
                        id: data.id,
                        name: data.name ?? '',
                        description: data.description ?? '',
                        logo: data.logo ?? '',
                        location: data.location ?? '',
                        employees: data.employees ?? [],
                    });
                } catch (error) {
                    console.error("Error fetching cafe:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchCafe();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
       
        
        Object.entries(form).forEach(([key, value]) => {
            if (key === "id" && !id) return;
            if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
        } else {
            formData.append(key, value);
        }
        });
        if (file) formData.append('logo', file);

        try {
            if (id) {
                await axios.put(`http://localhost:5222/api/Cafe/${id}`, formData, {
                    'Content-Type': 'multipart/form-data'
                })
                    .then(response => {
                        console.log('Cafe updated:', response.data);
                    })
                    .catch(error => {
                        console.error('Error updating cafe:', error);
                    });
            } else {
                await axios.post('http://localhost:5222/api/cafe', formData, {
                    'Content-Type': 'multipart/form-data'
                })
                    .then(response => {
                        console.log('Cafe updated:', response.data);
                    })
                    .catch(error => {
                        console.error('Error updating cafe:', error);
                    });
            }
            navigate('/cafes');
        } catch (error) {
            console.error("Error submitting cafe:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value ?? '',
        }));
    };

    if (id && loading) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <h2>{id ? 'Edit Cafe' : 'Add New Cafe'}</h2>

            <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                    required
                    minLength={6}
                    maxLength={10}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                    name="description"
                    className="form-control"
                    maxLength={256}
                    value={form.description}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Logo</label>
                <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                    type="text"
                    name="location"
                    className="form-control"
                    value={form.location}
                    onChange={handleChange}
                />
            </div>

            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/cafes')}>Cancel</button>
            </div>
        </form>
    );
};

export default AddEditCafePage;