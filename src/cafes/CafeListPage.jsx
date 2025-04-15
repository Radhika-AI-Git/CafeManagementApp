import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CafeListPage = () => {
    const [cafes, setCafes] = useState([]);
    const [locationFilter, setLocationFilter] = useState('');
    const navigate = useNavigate();

    const fetchCafes = async () => {
        try {
            const response = await axios.get(`/cafes${locationFilter ? `?location=${locationFilter}` : ''}`);
            setCafes(response.data);
        } catch (err) {
            console.error('Failed to fetch cafes', err);
        }
    };

    useEffect(() => {
        
         
        axios.get('http://localhost:5222/api/Cafe') // adjust your endpoint
            .then(response => {
                if (Array.isArray(response.data)) {
                    setCafes(response.data);
                } else {
                    setCafes([]);
                }
            })
            .catch(error => {
                console.error('Error fetching cafes:', error);
                setCafes([]);
            });
        window.scrollTo(0, 0);
   
    }, []);

    const deleteCafe = async (id) => {
        if (window.confirm('Are you sure you want to delete this cafe?')) {
            await axios.delete(`http://localhost:5222/api/Cafe/${id}`);
            fetchCafes();
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Cafes</h2>
                <button className="btn btn-success" onClick={() => navigate('/cafes/add')}>Add New Cafe</button>
            </div>

            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Filter by location"
                    className="form-control"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                />
            </div>

            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Employees</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(cafes) && cafes.length > 0 ? (
                        cafes.map(cafe => (
                            <tr key={cafe.id}>
                                <td>{cafe.logo ? <img src={cafe.logo} alt="logo" width="40" /> : 'N/A'}</td>
                                <td>{cafe.name}</td>
                                <td>{cafe.description}</td>
                                <td>
                                    <button className="btn btn-link" onClick={() => navigate(`/employees?cafe=${cafe.id}`)}>
                                        {cafe.employees}
                                    </button>
                                </td>
                                <td>{cafe.location}</td>
                                <td>
                                    <button className="btn btn-sm btn-primary me-2" onClick={() => navigate(`/cafes/edit/${cafe.id}`)}>Edit</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => deleteCafe(cafe.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No cafes found.</td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
    );
};

export default CafeListPage;