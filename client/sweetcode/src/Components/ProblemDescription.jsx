import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { problemDescription } from "../atoms/global";
import "./ProblemDescription.css";

function ProblemDescription() {
  const [descData] = useAtom(problemDescription);

  useEffect(() => {
    console.log("descData changed:", descData);
  }, [descData]);

  return (
    <div>
      {descData && (
        <div className="problem-description">
          <h2>{descData.title}</h2>

          <strong>Description:</strong>
          <p>{descData.description}</p>

          <strong>Input:</strong>
          <pre>{descData.input}</pre>

          <strong>Output:</strong>
          <pre>{descData.output}</pre>
          {descData.example && Array.isArray(descData.example) && (
            <>
              <strong>Examples:</strong>
              <div className="example-section">
                {descData.example.map((ex, idx) => (
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
            {(descData.constraints || []).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProblemDescription;
