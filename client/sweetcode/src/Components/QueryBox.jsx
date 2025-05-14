import React, { useState } from "react";

function QueryBox() {
  const [query, setQuery] = useState("");
  const [reframedQuestion, setReframedQuestion] = useState("");
  const updateQuery = (value) => {
    setQuery(value);
  };
  const searchQuery = async () => {
    console.log("Searching for:", query);
    try {
      const payload = {
        query: query,
      };
      // console.log("Payload:", payload);
      const response = await fetch(`${apiUrl}/reframe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      // console.log("API Response:", result);
      if (response.ok) {
        setReframedQuestion(result.reframedQuestion);
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
