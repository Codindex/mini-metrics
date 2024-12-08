"use client";
import { useState } from "react";

export default function FormulasPage() {
  const [formulas, setFormulas] = useState<string[]>([
    "a + b",
    "a - b",
    "a * b",
    "a / b",
    
  ]); // List of existing formulas
  const [newFormula, setNewFormula] = useState<string>(""); // State for new formula
  const [graphData, setGraphData] = useState<number[]>([]); // Data for graph display
  const [appliedFormula, setAppliedFormula] = useState<string>(""); // Currently applied formula

  // Handle new formula input
  const handleNewFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFormula(e.target.value);
  };

  // Add new formula to the list
  const addNewFormula = () => {
    if (newFormula.trim()) {
      setFormulas((prev) => [...prev, newFormula]);
      setNewFormula("");
    }
  };

  // Apply formula and generate dummy graph data
  const applyFormula = (formula: string) => {
    setAppliedFormula(formula);
    // Generate dummy data for the graph
    const dummyData = Array.from({ length: 10 }, (_, i) => i + Math.random() * 10);
    setGraphData(dummyData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Formula Dashboard</h1>

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
        <h2 className="text-xl font-semibold mb-4">Create Your Own Formula</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            value={newFormula}
            onChange={handleNewFormulaChange}
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
          <div className="w-full h-64 bg-white shadow-md rounded-md p-4">
            {/* Dummy Graph using Bars */}
            <div className="flex items-end h-full space-x-2">
              {graphData.map((value, index) => (
                <div
                  key={index}
                  style={{ height: `${value * 5}px` }}
                  className="w-4 bg-blue-600"
                  title={`Value: ${value.toFixed(2)}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
