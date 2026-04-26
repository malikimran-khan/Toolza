from flask import Flask
from flask_cors import CORS
from app.routes.convert import convert_bp
from app.routes.pdf import pdf_bp
import os

def create_app():
    app = Flask(__name__)
    
    # Allow CORS for your React frontend
    CORS(app)
    
    # Register Blueprints
    app.register_blueprint(convert_bp, url_prefix='/api')
    app.register_blueprint(pdf_bp, url_prefix='/api')
    
    @app.route('/health')
    def health():
        return {"status": "healthy", "service": "image-pdf-converter"}, 200
        
    return app
