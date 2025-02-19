import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


  
    const RentalStatus = ({ c }) => {
        const [statusData, setStatusData] = useState([]);
      
        useEffect(() => {
          if (!c || c.length === 0) {
            setStatusData([]);
            return;
          }
  
          const total = c.length;
          const hired = c.filter((contract) => contract.statut === "confirmed").length;
          const pending = c.filter((contract) => contract.statut === "pending").length;
          const cancelled = total - hired - pending;
      
          const hiredPercent = total ? Math.round((hired / total) * 100) : 0;
          const pendingPercent = total ? Math.round((pending / total) * 100) : 0;
          const cancelledPercent = total ? Math.round((cancelled / total) * 100) : 0;
      
          setStatusData([
            { name: "Hired", value: hiredPercent, color: "#1a365d" },
            { name: "Pending", value: pendingPercent, color: "#ef4444" },
            { name: "Cancelled", value: cancelledPercent, color: "#e5e7eb" },
          ]);
        }, [c]);
      

  return (
    <div className="card h-100">
      <div className="card-header bg-white">
        <h5 className="card-title mb-0">Rental Status</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <div style={{ height: '200px', width: '100%' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column justify-content-center h-100">
              {statusData.map((item, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <div 
                      className="rounded-circle me-2" 
                      style={{ 
                        width: '10px', 
                        height: '10px', 
                        backgroundColor: item.color 
                      }}
                    ></div>
                    <span>{item.name}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="fw-semibold">{item.value}%</span>
                    <i className={`bi bi-arrow-${item.value > 50 ? 'up' : 'down'} ms-2 
                      ${item.value > 50 ? 'text-success' : 'text-danger'}`}></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalStatus;