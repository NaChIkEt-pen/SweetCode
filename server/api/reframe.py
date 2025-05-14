import os
from flask import request, jsonify
from flask_restful import Resource
from extension import model

code_reframe_system_instruction = (
    "You are a competitive programming question reframing assistant. "
    "Your task is to take a competitive programming question and reframe it in a clear, structured format with: "
    "\n1. A concise but descriptive title that captures the core problem "
    "\n2. A detailed problem description that includes: "
    "\n   - The main task/challenge "
    "\n   - Input format and constraints "
    "\n   - Output format and requirements "
    "\n   - Clear examples with explanations "
    "\n3. Keep the technical requirements and constraints intact "
    "\n4. Use proper formatting with paragraphs and bullet points for readability "
    "\n5. Maintain mathematical notation and variable names as given "
    "\n6. Do not modify the core problem or add new constraints "
    "\n7. Focus on making the question more understandable while preserving its competitive programming nature"
    "The answer should be in the json format with keys 'title','description','input','output','constraints','example'. "
)

class ReframeQuestion(Resource):
    def post(self):
        data = request.get_json()

        question = data.get("question")
        reframe = code_reframe_system_instruction + "\n" + question
        response = model.generate_content(reframe)
        res = response.text
        if res.strip().startswith("```json"):
            res = "\n".join(res.strip().splitlines()[1:])
        if res.strip().endswith("```"):
            res = "\n".join(res.strip().splitlines()[:-1])
            
        return res, 200