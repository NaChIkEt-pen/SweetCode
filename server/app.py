import os
from flask import Flask
from flask_restful import Api
from dotenv import load_dotenv
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
from flask_cors import CORS

load_dotenv()



def create_app():
    app = Flask(__name__)
    api = Api(app)
    client = app.test_client()
    CORS(app,resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE"], "allow_headers": ["Content-Type"]}})
    # CORS(app, resources={r"/*": {"origins": "http://localhost:5174"}})
    @app.route('/')
    def home():
        return {"message": "hello world"}, 200
    @app.after_request
    def after_request(response):
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
        response.headers.add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
        return response

    """"""""""""""""""
    """Code Gen API"""
    from api.codegen import CodeGen
    api.add_resource(CodeGen, "/codegen")

    """Reframe API"""
    from api.reframe import ReframeQuestion
    api.add_resource(ReframeQuestion, "/reframe")
    """I/O O/P Gen API"""
    from api.ipopgen import TestCaseGen
    api.add_resource(TestCaseGen, "/testcasegen")

    app.client = app.test_client()  
    return app    