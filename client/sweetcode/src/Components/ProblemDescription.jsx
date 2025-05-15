import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { problemDescription } from "../atoms/global";

function ProblemDescription() {
  const [descData] = useAtom(problemDescription);

  useEffect(() => {
    console.log("descData changed:", descData);
  }, [descData]);
  return (
    <div className="problem-description">
      <h2>{descData.title}</h2>
      {descData && <strong>Description:</strong>}
      <p>{descData.description}</p>
      {descData && <strong>Constraints:</strong>}
      <ul>
        {(descData.constraints || []).map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <pre>
        {descData && <strong>Input:</strong>} {descData.input}
        {"\n"}
        {descData && <strong>Output:</strong>} {descData.output}
      </pre>
    </div>
  );
}

export default ProblemDescription;
