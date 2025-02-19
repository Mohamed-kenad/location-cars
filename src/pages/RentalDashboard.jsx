import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import RentalStatus from "./Status";

const RentalDashboard = ({ c }) => {
  const [timeRange, setTimeRange] = useState("last8Month");
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    setMonthlyData(processMonthlyData(c));
  }, [c]);

  const processMonthlyData = (contracts) => {
    if (!contracts || contracts.length === 0) return [];

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const data = months.map((month) => ({ month, earnings: 0, bookings: 0 }));

    contracts.forEach((contract) => {
      if (contract.statut === "confirmed") {
      const date = new Date(contract.datedebut);
      const monthIndex = date.getMonth();
      data[monthIndex].earnings += contract.total;
      data[monthIndex].bookings += 1;
      }
    });

    return data;
  };

  return (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Earnings Summary</h5>
              <select
                className="form-select form-select-sm"
                style={{ width: "auto", minWidth: "140px" }}
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="last8Month">Last 8 Month</option>
                <option value="thisYear">This Year</option>
              </select>
            </div>
            <div className="card-body">
              <ResponsiveContainer height={300}>
                <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} padding={{ left: 10, right: 10 }} />
                  <YAxis tick={{ fontSize: 12 }} width={60} />
                  <Tooltip />
                  <Line type="monotone" dataKey="earnings" stroke="#ff4d4f" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <RentalStatus c={c} />
        </div>
      </div>
    </div>
  );
};

export default RentalDashboard;
