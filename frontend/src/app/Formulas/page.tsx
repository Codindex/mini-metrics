"use client";
import { useState, useEffect } from "react";
import { Chart, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function FormulasPage() {
  const [formulas, setFormulas] = useState<string[]>(["a + b", "a - b"]);
  const [newFormula, setNewFormula] = useState<string>("");
  const [appliedFormula, setAppliedFormula] = useState<string>("a + b");
  const [graphData, setGraphData] = useState<number[]>([]);
  const [labels, setLabels] = useState<number[]>([]);

  // Generate dummy data for graph on formula apply
  const applyFormula = (formula: string) => {
    setAppliedFormula(formula);
    const dummyData = Array.from({ length: 10 }, () => Math.random() * 10);
    const timeLabels = Array.from({ length: 10 }, (_, i) => i * 5); // Time in minutes
    setGraphData(dummyData);
    setLabels(timeLabels);
  };

  const addNewFormula = () => {
    if (newFormula.trim()) {
      setFormulas((prev) => [...prev, newFormula]);
      setNewFormula("");
    }
  };

  // Data for Chart.js
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `Graph for: ${appliedFormula}`,
        data: graphData,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Dynamic Formula Graph",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (minutes)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Formulas Dashboard</h1>

      {/* List of Existing Formulas */}
      <div className="w-full max-w-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Existing Formulas</h2>
        <ul className="list-disc pl-5 space-y-2">
          {formulas.map((formula, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{formula}</span>
              <button
                onClick={() => applyFormula(formula)}
                className="text-blue-600 hover:underline"
              >
                Apply
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Create New Formula */}
      <div className="w-full max-w-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Create a new Formula</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            value={newFormula}
            onChange={(e) => setNewFormula(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter a formula (e.g., x + y)"
          />
          <button
            onClick={addNewFormula}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-500"
          >
            Add
          </button>
        </div>
      </div>

      {/* Graph Section */}
      {appliedFormula && (
        <div className="w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-4">
            Graph for: <span className="text-blue-600">{appliedFormula}</span>
          </h2>
          <div className="w-full bg-white shadow-md rounded-md p-4">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
}
