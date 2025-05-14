import os
from dotenv import load_dotenv
import google.generativeai as genai


load_dotenv()
key = os.getenv('GEMINI_KEY')
gemini_api_key = key

genai.configure(api_key=gemini_api_key)
model = genai.GenerativeModel("gemini-2.0-flash")