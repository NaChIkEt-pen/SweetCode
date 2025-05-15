import React, { useState } from "react";
import ProblemDescription from "./Components/ProblemDescription";
import CodeEditor from "./components/CodeEditor";
import Controls from "./components/Controls";
import QueryBox from "./Components/QueryBox";
import "./App.css";

function App() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [question, setQuestion] = useState(false);

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
        <CodeEditor language={language} code={code} setCode={setCode} />
        <Controls
          language={language}
          setLanguage={setLanguage}
          input={input}
          setInput={setInput}
          output={output}
          handleRun={handleRun}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
export default App;
