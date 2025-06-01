import os
from flask import request, jsonify
from flask_restful import Resource
from extension import model
import json
code_gen_system_instruction = (
    "You are a competitive programming assistant. "
    "Always generate C++ and python code optimized for the least possible time and space complexity, suitable for platforms like LeetCode, HackerRank, and Codeforces. "
    "Avoid brute-force or naive approaches unless explicitly requested. "
    "Use efficient algorithms and patterns such as sliding window, hash maps, prefix sums, binary search, or two-pointers when appropriate. "
    "Do not include import statements or unnecessary boilerplate. "
    "Focus strictly on clarity, efficiency, and correctness under tight constraints typical of competitive programming."
    "the answer format should be a json with keys 'cppcode' & 'pythoncode'"
    "the code should contain the main function to take input and output in the required format. "
    "in the code generated for the given question the input should not be hard coded as later same code will be used to generate different test cases, make sure to add ways to take proper input and proper output display"
    "the code should contain all the required imports"
)

class CodeGen(Resource):
    def post(self):
        data = request.get_json()
        
        formatted_question = data.get("formatted_question")
        if not formatted_question:
            return jsonify({"error": "No formatted question provided"}), 400
        
        # print("hello", formatted_question)
        full_prompt = code_gen_system_instruction + str(formatted_question)
        response = model.generate_content(full_prompt)
        res = response.text
        if res.strip().startswith("```json"):
            res = "\n".join(res.strip().splitlines()[1:])
        if res.strip().endswith("```"):
            res = "\n".join(res.strip().splitlines()[:-1])

        data = json.loads(res)
        # print(str(data['cppcode']))
        # print(data['pythoncode'])
        return res, 200
    