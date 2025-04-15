import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeListPage = () => {
    const [employees, setEmployees] = useState([]);
    const [searchParams] = useSearchParams();
    const cafeId = searchParams.get('cafe');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            const res = await axios.get(`http://localhost:5222/api/Employee/${cafeId}`);
            setEmployees(res.data);
        };
        fetchEmployees();
    }, [cafeId]);

    const deleteEmployee = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            await axios.delete(`http://localhost:5222/api/employee/${id}`);
            setEmployees(employees.filter(emp => emp.id !== id));
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Employees</h2>
                <button className="btn btn-success" onClick={() => navigate(`/employees/add/${cafeId}`)}>Add New Employee</button>
            </div>
            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Days Worked</th>
                        <th>Cafe</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.email_address}</td>
                            <td>{emp.phone_number}</td>
                            <td>{emp.days_worked}</td>
                            <td>{emp.cafe || '-'}</td>
                            <td>
                                <button className="btn btn-sm btn-primary me-2" onClick={() => navigate(`/employees/edit/${emp.id}`)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => deleteEmployee(emp.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeListPage;