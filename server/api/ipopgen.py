import os
from flask import request, jsonify
from flask_restful import Resource
from extension import model

test_code_prompt = (
    "Write Python code to generate stress test cases, boundary test cases, and edge case test cases, but make sure each test case has a valid output. "
    "for the given C++ problem. Only generate the input test cases and store them in a list called `inputs` and similarly for outputs store in `outputs`. `inputs` and `outputs` are parrellel lists. "
    "Do NOT attempt to run or validate them against any C++ code. While maintaining the format needed for input and output needed for the given C++ code."
    "Do not include unnecessary boilerplate. Do NOT include the name of programming language, the code should be directly executable with simple copy and paste no moodification should be required. "
    "Just generate diverse and comprehensive test inputs suitable for algorithmic challenges."
)

class TestCaseGen(Resource):
    def post(self):
        data = request.get_json()
        code = data.get("code")

        response = model.generate_content(test_code_prompt + code)
        res = response.text
        if res.strip().startswith("```python"):
            res = "\n".join(res.strip().splitlines()[1:])
        if res.strip().endswith("```"):
            res = "\n".join(res.strip().splitlines()[:-1])
        # print(res)
        exec_globals = {}
        exec(res, exec_globals)

        inputs = exec_globals.get("inputs", [])
        outputs = exec_globals.get("outputs", [])

        print("\n--- Generated Test Cases ---")
        for i, (inp, out) in enumerate(zip(inputs, outputs), 1):
            print(f"Test Case {i}:\n  Input: {inp}\n  Output: {out}\n")

        return res, 200