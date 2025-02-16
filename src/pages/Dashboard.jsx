import React from "react";
import "../index.css";
import { useState,useEffect } from "react";
import axios from "axios";


const DashboardCard = ({ icon, title, value, bgColor }) => (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
        <div className={`card h-100 text-white ${bgColor}`}>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <h5 className="card-title fs-6 mb-2">{title}</h5>
                        <h2 className="fs-3 mb-0">{value}</h2>
                    </div>
                    <i className={`bi bi-${icon} fs-4`} style={{ opacity: 0.7 }}></i>
                </div>
                <button className="btn btn-link text-white p-0 mt-3 text-decoration-none">
                    More details
                </button>
            </div>
        </div>
    </div>
);

const StatCard = ({ icon, label, value, suffix = '' }) => (
    <div className="col-12 col-sm-6 col-lg-3 mb-4">
        <div className="card h-100 border-0 shadow-sm">
            <div className="card-body d-flex align-items-center p-3">
                <div className="d-flex align-items-center w-100">
                    <div className="me-3">
                        <i className={`bi bi-${icon} text-secondary`}></i>
                    </div>
                    <div>
                        <div className="text-secondary small">{label}</div>
                        <div className="fs-5 fw-semibold">
                            {value} {suffix}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const [activeTab, setActiveTab] = React.useState('daily');
    const [voitures, setVoitures] = useState('');
    const [contrats, setContrats] = useState('');

    useEffect(() => {
        axios.get("http://localhost:8080/voitures")
            .then(res => {
                const available = res.data.filter(vehicle => vehicle.disponible === true).length;
                setVoitures(available);
            })   
            axios.get("http://localhost:8080/contrats")
            .then(res => {
                const Active=res.data.filter((c)=>new Date(c.datefin) >= new Date()).length;
                setContrats(Active)}
            )
    }, []); 
     
     


    return (
        <div className='container-fluid min-vh-100 bg-light py-4'>
            <div className="p-3 p-lg-4">
                {/* Top Cards */}
                <div className="row g-3">
                    <DashboardCard
                        icon="file-text me-2" 
                        title="Services"
                        value={contrats}
                        bgColor="bg-warning"
                    />
                    <DashboardCard
                        icon="car-front"
                        title="Available Vehicles"
                        value={voitures}
                        bgColor="bg-success"
                    />
                    <DashboardCard
                        icon="coin"
                        title="Expenses"
                        value="$2,450"
                        bgColor="bg-secondary"
                    />
                </div>

                {/* Time Period Tabs */}
                <div className="card mt-4 mb-4 border-0 shadow-sm">
                    <div className="card-body">
                        <ul className="nav nav-pills nav-fill flex-nowrap overflow-auto">
                            {['daily', 'weekly', 'monthly', 'yearly'].map((period) => (
                                <li className="nav-item" key={period}>
                                    <button
                                        className={`nav-link ${activeTab === period ? 'active' : ''}`}
                                        onClick={() => setActiveTab(period)}
                                    >
                                        {period.charAt(0).toUpperCase() + period.slice(1)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="row g-3">
                    <StatCard
                        icon="file-text me-2"
                        label="Services"
                        value="42"
                    />
                    <StatCard
                        icon="currency-dollar"
                        label="Revenue"
                        value="8,750"
                        suffix="DH"
                    />
                    <StatCard
                        icon="coin"
                        label="Expenses"
                        value="2,450"
                        suffix="DH"
                    />
                    <StatCard
                        icon="people"
                        label="Total Customers"
                        value="156"
                    />
                </div>

                {/* Bottom Action Cards */}
                <div className="row g-3 mt-2">
                    {[
                        { icon: 'archive', title: 'Expense Archive', value: '0 DH', color: 'text-info' },
                        { icon: 'currency-dollar', title: 'Revenue', value: '0 DH', color: 'text-danger' },
                        { icon: 'car-front', title: 'Service Archive', value: '0', color: 'text-success' },
                        { icon: 'people', title: 'Customer Archive', value: '0', color: 'text-warning' }
                    ].map((item, index) => (
                        <div className="col-12 col-sm-6 col-lg-3" key={index}>
                            <div className="card h-100 border-0 shadow-sm hover-shadow">
                                <div className="card-body text-center p-3">
                                    <i className={`bi bi-${item.icon} mb-2 ${item.color} fs-4`}></i>
                                    <h5 className="card-title fs-6">{item.title}</h5>
                                    <p className="card-text text-secondary mb-0">{item.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Dashboard;