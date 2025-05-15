import React, { useState } from "react";
import { useAtom } from "jotai";
import { problemDescription } from "../atoms/global";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function QueryBox() {
  const [query, setQuery] = useState("");
  const [reframedQuestion, setReframedQuestion] = useAtom(problemDescription);
  const [alert, setAlert] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

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

        console.log("Final parsed result:", result);
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

  return (
    <div className="query-box">
      <h2>Sweet Code</h2>
      <textarea onChange={(e) => updateQuery(e.target.value)} />
      <button className="query-btn" onClick={searchQuery}>
        Ask the Question
      </button>
      <Popup open={isOpen} onClose={() => setIsOpen(false)} modal nested>
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header">Reframed Question</div>
            <div className="content">
              <h3>{reframedQuestion?.title}</h3>
              <p>{reframedQuestion?.description}</p>
              <ul>
                {(reframedQuestion?.constraints || []).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <pre>
                <strong>Input:</strong> {reframedQuestion?.input}
                {"\n"}
                <strong>Output:</strong> {reframedQuestion?.output}
              </pre>
            </div>
            <div className="actions">
              <button
                className="button"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
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
