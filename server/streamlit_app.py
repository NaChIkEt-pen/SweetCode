import streamlit as st
import google.generativeai as genai
import requests
import subprocess
import os
from dotenv import load_dotenv


st.title("APP")
load_dotenv()
key = os.getenv('GEMINI_KEY')
gemini_api_key = key


reframe_question_prompt = st.text_area("Reframe here:", height=200)


code_prompt = st.text_area("Paste your question here:", height=200)

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
)

code_gen_system_instruction = (
    "You are a competitive programming assistant. "
    "Always generate C++ code optimized for the least possible time and space complexity, suitable for platforms like LeetCode, HackerRank, and Codeforces. "
    "Avoid brute-force or naive approaches unless explicitly requested. "
    "Use efficient algorithms and patterns such as sliding window, hash maps, prefix sums, binary search, or two-pointers when appropriate. "
    "Do not include import statements or unnecessary boilerplate. "
    "Focus strictly on clarity, efficiency, and correctness under tight constraints typical of competitive programming."
)
test_code_prompt = (
    "Write Python code to generate stress test cases, boundary test cases, and edge case test cases "
    "for the given C++ problem. Only generate the input test cases and store them in a list called `inputs` and similarly for outputs store in `outputs`. `inputs` and `outputs` are parrellel lists. "
    "Do NOT attempt to run or validate them against any C++ code. While maintaining the format needed for input and output needed for the given C++ code."
    "Do not include unnecessary boilerplate. Do NOT include the name of programming language, the code should be directly executable with simple copy and paste no moodification should be required. "
    "Just generate diverse and comprehensive test inputs suitable for algorithmic challenges."
)

def execute_cpp_string(cpp_string):
    try:
        # Save the C++ code to a temporary file
        with open("temp.cpp", "w") as f:
            f.write(cpp_string)

        # Compile the C++ code
        compile_process = subprocess.run(["g++", "temp.cpp", "-o", "temp_exe"], capture_output=True, text=True)
        if compile_process.returncode != 0:
            raise Exception(f"Compilation Error:\n{compile_process.stderr}")

        # Execute the compiled code
        execute_process = subprocess.run(["./temp_exe"], capture_output=True, text=True)
        if execute_process.returncode != 0:
             raise Exception(f"Execution Error:\n{execute_process.stderr}")

        # Return the output
        return execute_process.stdout.strip()
    except Exception as e:
        return str(e) # Return the error message as a string
    finally:
        # Clean up the temporary files
        subprocess.run(["rm", "temp.cpp", "temp_exe"])
        
if st.button("Code"):
    try:
        genai.configure(api_key=gemini_api_key)
        model = genai.GenerativeModel("gemini-2.0-flash")

        # Combine system instruction and user code prompt

        reframe = code_reframe_system_instruction + "\n" + reframe_question_prompt
        response = model.generate_content(reframe)

        st.code(response.text)

        full_prompt = code_gen_system_instruction + code_prompt
        response = model.generate_content(full_prompt)

        # Extract C++ code
        cpp_code_parts = response.text.split("```")
        
        cpp_code = cpp_code_parts[1] if len(cpp_code_parts) > 1 else response.text
        print(cpp_code)
        st.subheader("Generated C++ Code")
        
        if cpp_code.strip().startswith("cpp" or "c++"):
            cpp_code = "\n".join(cpp_code.strip().splitlines()[1:])
        
        st.code(cpp_code.strip(), language="cpp")

        # Generate test generation code
        response = model.generate_content(test_code_prompt + cpp_code)
        code_parts = response.text.split("```")
        test_code = code_parts[1] if len(code_parts) > 1 else response.text

        # Remove 'python' label if present
        if test_code.strip().startswith("python"):
            test_code = "\n".join(test_code.strip().splitlines()[1:])

        # Execute the generated test code
        exec_globals = {}
        exec(test_code, exec_globals)

        # Print inputs and outputs to terminal and Streamlit
        inputs = exec_globals.get("inputs", [])
        outputs = exec_globals.get("outputs", [])

        # print("\n--- Generated Test Cases ---")
        # for i, (inp, out) in enumerate(zip(inputs, outputs), 1):
            # print(f"Test Case {i}:\n  Input: {inp}\n  Output: {out}\n")

        # st.subheader("Generated Test Inputs and Outputs")
        # for i, (inp, out) in enumerate(zip(inputs, outputs), 1):
        #     st.text(f"Test Case {i}:")
        #     st.text(f"  Input: ")
        #     st.code(inp)
        #     st.text(f"  Output: ")
        #     st.code(out)
        output = execute_cpp_string(cpp_code)
        print(output)

    except Exception as e:
        st.error(f"An error occurred: {e}")
