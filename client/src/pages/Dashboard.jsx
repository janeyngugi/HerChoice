import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/reports/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <div className="p-8 text-center">Loading Data Analytics...</div>;

  const data = {
    labels: Object.keys(stats.byType),
    datasets: [
      {
        label: 'Reports by Type',
        data: Object.values(stats.byType),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Big Data Analytics Dashboard</h1>
      <p className="text-gray-600 mb-8">Analyzing patterns to predict risks and deploy resources effectively.</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Total Incidents Reported: {stats.total}</h2>
          <div className="h-64">
             <Bar data={data} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h2 className="text-xl font-bold mb-4">Distribution</h2>
           <div className="h-64 flex justify-center">
             <Pie data={data} options={{ maintainAspectRatio: false }} />
           </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h3 className="font-bold text-blue-800 mb-2">Insight</h3>
          <p className="text-blue-700">
              Based on the current data, there is a prevalence of <strong>{Object.keys(stats.byType).reduce((a, b) => stats.byType[a] > stats.byType[b] ? a : b)}</strong> incidents.
              Recommendation: Increase awareness campaigns and deploy more support resources in affected areas.
          </p>
      </div>
    </div>
  );
};

export default Dashboard;
