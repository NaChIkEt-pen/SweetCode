import React, { useState, useMemo } from "react";
import "./Controls.css";
import { useAtom } from "jotai";
import {
  genCodeLangauge,
  testCaseInput,
  testCaseOutput,
} from "../atoms/global";

function Controls({ language, setLanguage, handleRun, handleSubmit }) {
  const [input, setInput] = useAtom(testCaseInput);
  const [output, setOutput] = useAtom(testCaseOutput);
  const [activeIndex, setActiveIndex] = useState(0);
  const [genCodeLang, setGenCodeLang] = useAtom(genCodeLangauge);

  const testCases = useMemo(() => {
    if (!Array.isArray(input) || !Array.isArray(output))
      return [{ input: "", output: "" }];
    return input.map((inp, idx) => ({
      input: inp || "",
      output: output[idx] || "",
    }));
  }, [input, output]);

  // Add fallback if no test cases exist
  if (testCases.length === 0) {
    testCases.push({ input: "", output: "" });
  }

  const updateTestCaseInput = (value) => {
    const newInput = [...safeInput];
    newInput[activeIndex] = value;
    setInput(newInput);
  };

  const addTestCase = () => {
    setInput([...safeInput, ""]);
    setOutput([...safeOutput, ""]);
    setActiveIndex(testCases.length);
  };

  const deleteTestCase = (index) => {
    if (testCases.length === 1) return;
    const newInput = safeInput.filter((_, i) => i !== index);
    const newOutput = safeOutput.filter((_, i) => i !== index);
    setInput(newInput);
    setOutput(newOutput);
    setActiveIndex(index > 0 ? index - 1 : 0);
  };

  return (
    <div className="controls">
      <div className="top-controls">
        <select
          value={language}
          onChange={(e) => setGenCodeLang(e.target.value)}
        >
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
