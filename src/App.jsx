import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CafeListPage from './cafes/CafeListPage';
import EmployeeListPage from './employees/EmployeeListPage';
import AddEditCafePage from './cafes/AddEditCafePage';
import AddEditEmployeePage from './employees/AddEditEmployeePage';

const App = () => {
    return (
        <Router>
            <div className="container mt-4">
                <h1 className="text-center mb-4">Cafe Employee Manager</h1>
                <Routes>
                    <Route path="/" element={<Navigate to="/cafes" />} />
                    <Route path="/cafes" element={<CafeListPage />} />
                    <Route path="/cafes/add" element={<AddEditCafePage />} />
                    <Route path="/cafes/edit/:id" element={<AddEditCafePage />} />
                    <Route path="/employees" element={<EmployeeListPage />} />
                    <Route path="/employees/add/:cafe" element={<AddEditEmployeePage />} />
                    <Route path="/employees/edit/:cafe" element={<AddEditEmployeePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;