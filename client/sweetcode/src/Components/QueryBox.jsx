import React, { useState } from "react";
import { useAtom } from "jotai";
import { problemDescription } from "../atoms/global";
function QueryBox() {
  const [query, setQuery] = useState("");
  const [reframedQuestion, setReframedQuestion] = useAtom(problemDescription);
  const [alert, setAlert] = useState("");
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
        setReframedQuestion(result);
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
      <h2>Query Box</h2>
      <textarea onChange={(e) => updateQuery(e.target.value)} />
      <button className="query-btn" onClick={searchQuery}>
        "Reframe the Question"
      </button>
    </div>
  );
}

export default QueryBox;
