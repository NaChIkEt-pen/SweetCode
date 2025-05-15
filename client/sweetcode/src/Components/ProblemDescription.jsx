import React from "react";
import "./ProblemDescription.css";
import { useAtom } from "jotai";
import { problemDescription } from "../atoms/global";
function ProblemDescription() {
  const [descData] = useAtom(problemDescription);

  let Title = "Two Sum";
  let Description =
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.";
  let Constraints = [
    <li key="1">
      You may assume that each input would have exactly one solution.
    </li>,
    <li key="2">You may not use the same element twice.</li>,
    <li key="3">You can return the answer in any order.</li>,
  ];
  let I_P = "nums = [2,7,11,15], target = 9";
  let O_P = "[0,1]";
  useEffect(() => {
    console.log(descData.title);
  }, [descData]);
  return (
    <div className="problem-description">
      <h2>{descData.title}</h2>
      <p>{Description}</p>
      <ul>{Constraints}</ul>
      <pre>
        <strong>Input:</strong> {I_P}
        {"\n"}
        <strong>Output:</strong> {O_P}
      </pre>
    </div>
  );
}

export default ProblemDescription;
