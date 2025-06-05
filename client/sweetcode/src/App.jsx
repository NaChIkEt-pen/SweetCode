import React, { useState } from "react";
import ProblemDescription from "./Components/ProblemDescription";
import CodeEditor from "./Components/CodeEditor";
import Controls from "./Components/Controls";
import QueryBox from "./Components/QueryBox";
import "./App.css";

function App() {
  const [language, setLanguage] = useState("CPP");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [question, setQuestion] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Solution");
  // const handleRun = (codeInput) => {
  //   console.log("Run code with input:", codeInput);
  // };

  // const handleSubmit = (codeInput) => {
  //   console.log("Submit code with input:", codeInput);
  // };

  const handleRun = () => {
    console.log("Running Code:\n", code);
    console.log("Language:", language);
    console.log("Input:\n", input);
    setOutput("Running...\n(Simulated output)");

    // Example: Simulate output
    // Later replace with API call to code execution backend
  };
  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };
  const handleSubmit = () => {
    console.log("Submitting Code:\n", code);
    console.log("Language:", language);
    console.log("Input:\n", input);
    setOutput("Submitting...\n(Submission logic simulated)");

    // Example: Submit code to backend
  };

  return (
    <div className="app-container">
      <div className="left-panel">
        <QueryBox className="query-box" />
        <ProblemDescription />
      </div>
      <div className="right-panel">
        <div className="radio-group">
          <input
            type="radio"
            id="option1"
            value="Solution"
            checked={selectedValue === "Solution"}
            onChange={() => handleRadioChange("Solution")}
          />
          <label htmlFor="option1">Solution</label>

          <input
            type="radio"
            id="option2"
            value="Practice"
            checked={selectedValue === "Practice"}
            onChange={() => handleRadioChange("Practice")}
          />
          <label htmlFor="option2">Practice</label>
        </div>
        <CodeEditor
          language={language}
          code={code}
          setCode={setCode}
          selectedValue={selectedValue}
        />
        {selectedValue == "Practice" && (
          <Controls
            language={language}
            setLanguage={setLanguage}
            input={input}
            setInput={setInput}
            output={output}
            handleRun={handleRun}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
export default App;
