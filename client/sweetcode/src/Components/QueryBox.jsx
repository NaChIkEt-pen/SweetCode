import React, { useState } from "react";
import { useAtom } from "jotai";
import {
  problemDescription,
  generatedCode,
  testCaseInput,
  testCaseOutput,
} from "../atoms/global";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
// import { getSession } from "../utils/session.js";

function QueryBox() {
  // const userId = getSession();
  const [query, setQuery] = useState("");
  const [reframedQuestion, setReframedQuestion] = useAtom(problemDescription);
  const [genCode, setGeneratedCode] = useAtom(generatedCode);
  const [input, setInput] = useAtom(testCaseInput);
  const [output, setOutput] = useAtom(testCaseOutput);

  const [alert, setAlert] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const generateTestCases = async (code) => {
    console.log("Generating test cases", code);
    try {
      const payload = {
        code: code,
      };
      // console.log("Payload:", payload);
      const response = await fetch(`${apiUrl}/testcasegen`, {
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
        // console.log("API Response:", result);
        const ip = result.inputs;
        const op = result.outputs;
        // console.log("ip:", ip);
        setInput(ip);
        setOutput(op);
      } else {
        setAlert(result.message);
      }
    } catch (error) {
      console.error("Submission error", error);
      setAlert("Error submitting form");
    }
  };
  const generateCode = async () => {
    console.log("Generating Code", reframedQuestion);
    try {
      const payload = {
        formatted_question: reframedQuestion,
      };
      // console.log("Payload:", payload);
      const response = await fetch(`${apiUrl}/codegen`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "X-User-ID": userId,
        },
        body: JSON.stringify(payload),
      });

      let result = await response.text();

      result = JSON.parse(result); // first parse, gets a string again
      result = JSON.parse(result);
      if (response.ok) {
        // console.log("API Response:", result["cppcode"]);
        setGeneratedCode(result);
        generateTestCases(result["cppcode"]);
      } else {
        setAlert(result.message);
      }
    } catch (error) {
      console.error("Submission error", error);
      setAlert("Error submitting form");
    }
  };
  const updateQuery = (value) => {
    // console.log(apiUrl);
    setQuery(value);
  };
  const searchQuery = async () => {
    // console.log("Searching for:", query);
    try {
      const payload = {
        question: query,
      };
      // console.log("Payload:", payload);
      const response = await fetch(`${apiUrl}/reframe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "X-User-ID": userId,
        },
        body: JSON.stringify(payload),
      });

      let result = await response.text();
      // console.log("API Response:", result);
      result = JSON.parse(result); // first parse, gets a string again
      result = JSON.parse(result);
      if (response.ok) {
        // Ensure constraints is an array
        if (typeof result.constraints === "string") {
          result.constraints = result.constraints
            .split("\n")
            .map((line) => line.replace(/^\*?\s*/, "").trim())
            .filter(Boolean);
        }

        // console.log("Final parsed result:", result);
        setReframedQuestion({ ...result });
        // console.log("QueryBox atom:", problemDescription);
        setIsOpen(true);
      } else {
        setAlert(result.message);
      }
    } catch (error) {
      console.error("Submission error", error);
      setAlert("Error submitting form");
    }
  };
  const setGenCodeFlag = async () => {
    // setGenCode(true);
    // gen;
    // console.log(genCode);
  };
  return (
    <div className="query-box">
      <h2>Sweet Code</h2>
      <textarea onChange={(e) => updateQuery(e.target.value)} />
      <button className="query-btn" onClick={searchQuery}>
        Ask the Question
      </button>
      <button className="query-btn" onClick={generateCode}>
        Generate Code
      </button>
      <Popup open={isOpen} onClose={() => setIsOpen(false)} modal nested>
        {(close) => (
          <div
            className="modal"
            style={{
              maxHeight: "80vh",
              overflowY: "auto",
              padding: "20px",
              background: "white",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <button className="close" onClick={close}>
              &times;
            </button>
            <h3 className="header">Reframed Question</h3>
            <div className="content">
              <div className="problem-description">
                <h2>{reframedQuestion?.title}</h2>

                <strong>Description:</strong>
                <p>{reframedQuestion?.description}</p>

                <strong>Input:</strong>
                <pre>{reframedQuestion?.input}</pre>

                <strong>Output:</strong>
                <pre>{reframedQuestion?.output}</pre>

                {reframedQuestion?.example &&
                  Array.isArray(reframedQuestion.example) && (
                    <>
                      <strong>Examples:</strong>
                      <div className="example-section">
                        {reframedQuestion.example.map((ex, idx) => (
                          <div
                            key={idx}
                            className="example-item"
                            style={{ marginBottom: "1rem" }}
                          >
                            <strong>Input:</strong>
                            <pre>{ex.input}</pre>

                            <strong>Output:</strong>
                            <pre>{ex.output}</pre>

                            <strong>Explanation:</strong>
                            <pre>{ex.explanation}</pre>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                <strong>Constraints:</strong>
                <ul>
                  {(reframedQuestion?.constraints || []).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="actions">
              <button className="button" onClick={() => setIsOpen(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}

export default QueryBox;
