import React, { useState, useEffect } from "react";
import "./Controls.css";
import { useAtom } from "jotai";
import {
  genCodeLangauge,
  testCaseInput,
  testCaseOutput,
  generatedCode,
} from "../atoms/global";

function Controls({ language, setLanguage, handleSubmit }) {
  const [input, setInput] = useAtom(testCaseInput);
  const [output, setOutput] = useAtom(testCaseOutput);
  const [genCode] = useAtom(generatedCode);
  const [activeIndex, setActiveIndex] = useState(0);
  const [genCodeLang, setGenCodeLang] = useAtom(genCodeLangauge);
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
  const [alert, setAlert] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const currentTestCase = testCases[activeIndex] || {
    input: "",
    output: "",
    ex_output: "",
  };
  const handleRun = async () => {
    // console.log("Running Code:\n", genCode["cppcode"]);
    // console.log("Language:", language);
    // console.log("Input:\n", input);
    try {
      const payload = {
        code: genCode["cppcode"],
        language: language,
        inputs: input,
      };
      // console.log("Payload:", payload);
      const response = await fetch(`${apiUrl}/coderun`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "X-User-ID": userId,
        },
        body: JSON.stringify(payload),
      });

      let result = await response.text();

      result = JSON.parse(result); // first parse, gets a string again
      // result = JSON.parse(result);
      if (response.ok) {
        console.log("API Response:", result);
        // const ip = result.inputs;
        // const op = result.outputs;
        // // console.log("ip:", ip);
        // setInput(ip);
        // setOutput(op);
      } else {
        setAlert(result.message);
      }
    } catch (error) {
      console.error("Submission error", error);
      setAlert("Error submitting form");
    }
    // setOutput("Running...\n(Simulated output)");
  };
  useEffect(() => {
    const newTestCases = input.map((inp, idx) => ({
      input: inp,
      output: "",
      ex_output: output[idx] || "",
    }));
    setTestCases(newTestCases);
  }, [input, output]);

  // Add fallback if no test cases exist
  if (testCases.length === 0) {
    testCases.push({ input: "", output: "" });
  }

  const updateTestCaseInput = (value) => {
    const newInput = [...input];
    newInput[activeIndex] = value;
    setInput(newInput);
  };

  const addTestCase = () => {
    setInput((prev) => [...prev, ""]);
    setOutput((prev) => [...prev, ""]);
    setTimeout(() => {
      setActiveIndex(testCases.length);
    }, 0);
  };

  const deleteTestCase = (index) => {
    if (testCases.length === 1) return;
    const newInput = input.filter((_, i) => i !== index);
    const newOutput = output.filter((_, i) => i !== index);
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
          {/* <option value="python">Python</option> */}
          <option value="CPP">C++</option>
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
          value={currentTestCase.input}
          onChange={(e) => updateTestCaseInput(e.target.value)}
          className="custom-textarea"
        />

        <label>Output</label>
        <textarea
          value={currentTestCase.output}
          readOnly
          className="custom-textarea"
        />
        <label>Expected Output</label>
        <textarea
          value={currentTestCase.ex_output}
          readOnly
          className="custom-textarea"
        />
      </div>
    </div>
  );
}

export default Controls;
