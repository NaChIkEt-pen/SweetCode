import React, { useState } from "react";
import "./Controls.css";

function Controls({ language, setLanguage, handleRun, handleSubmit }) {
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateTestCaseInput = (value) => {
    const newCases = [...testCases];
    newCases[activeIndex].input = value;
    setTestCases(newCases);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
    setActiveIndex(testCases.length);
  };

  const deleteTestCase = (index) => {
    if (testCases.length === 1) return;
    const newCases = testCases.filter((_, i) => i !== index);
    setTestCases(newCases);
    setActiveIndex(index > 0 ? index - 1 : 0);
  };

  return (
    <div className="controls">
      <div className="top-controls">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="python">Python</option>
          <option value="C++">C++</option>
        </select>
        <button onClick={() => handleRun(testCases[activeIndex].input)}>
          Run
        </button>
        <button onClick={() => handleSubmit(testCases[activeIndex].input)}>
          Submit
        </button>
      </div>

      <div className="testcase-tabs">
        {testCases.map((_, idx) => (
          <button
            key={idx}
            className={`tab-btn ${idx === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(idx)}
          >
            Case {idx + 1}
            <span
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteTestCase(idx);
              }}
            >
              ✕
            </span>
          </button>
        ))}
        <button className="add-btn" onClick={addTestCase}>
          ＋
        </button>
      </div>

      <div className="testcase-area">
        <label>Input</label>
        <textarea
          value={testCases[activeIndex].input}
          onChange={(e) => updateTestCaseInput(e.target.value)}
          className="custom-textarea"
        />
        <label>Output</label>
        <textarea
          value={testCases[activeIndex].output}
          readOnly
          className="custom-textarea"
        />
      </div>
    </div>
  );
}

export default Controls;
