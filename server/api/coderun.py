import os
from flask import request, jsonify
from flask_restful import Resource
import requests
from dotenv import load_dotenv
from extension import model
import json

load_dotenv()
key = os.getenv('ONE_COMPLIER_KEY')

class CodeRun(Resource):
    def post(self):
        data = request.get_json()
        code = data.get("code")
        input = data.get("inputs")
        language = data.get("language")
        print("input", input)
        print("code", repr(code))
        print(language)

        if not code:
            return jsonify({"error": "No code provided"}), 400
        malformed_code_str = code

        full_prompt  = ("The following code JSON is malformed or incorrectly formatted:\n"
        "Please fix the code and return ONLY a valid JSON object with keys 'cppcode' and 'pythoncode', "
        "each containing properly formatted code as strings. Do NOT add any markdown or extra text.")
        response = model.generate_content(full_prompt + code)
        
        res = response.text
        if res.strip().startswith("```json"):
            res = "\n".join(res.strip().splitlines()[1:])
        if res.strip().endswith("```"):
            res = "\n".join(res.strip().splitlines()[:-1])
        data = json.loads(res)
        # print(data["cppcode"])
        

        url = "https://onecompiler-apis.p.rapidapi.com/api/v1/run"
    
        headers = {
            "Content-Type": "application/json",
            "x-rapidapi-host": "onecompiler-apis.p.rapidapi.com",
            "x-rapidapi-key": key
        }
        output = []
        for inp in input:
            
            payload = {
                "language": language.lower(),
                "stdin": inp,
                "files": [
                    {
                        "name": "main.cpp",
                        # "content": data["cppcode"]
                        "content": code
                    }
                ]
            }
            
            try:
                response = requests.post(url, headers=headers, json=payload)
                print(response.json())
                # print(response.json()["stdout"].replace("\n", ""))
                # stdout = response.json().get("stdout", "")
                # output.append(str(stdout))
                # output.append(response.json()["stdout"])                
            except Exception as e:
                return jsonify({"error": str(e)}), 500
            
        # return jsonify(results = output)
        return "ok"
