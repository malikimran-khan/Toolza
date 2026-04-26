import img2pdf
import io
from flask import Blueprint, request, send_file, jsonify

pdf_bp = Blueprint("pdf", __name__)

@pdf_bp.route("/pdf/from-images", methods=["POST"])
def from_images():
    if "images" not in request.files:
        return jsonify({"error": "No images uploaded"}), 400
        
    files = request.files.getlist("images")
    if not files:
        return jsonify({"error": "Empty file list"}), 400

    try:
        image_bytes_list = [f.read() for f in files]
        pdf_bytes = img2pdf.convert(image_bytes_list)
        
        output = io.BytesIO(pdf_bytes)
        return send_file(
            output,
            mimetype="application/pdf",
            as_attachment=True,
            download_name="converted.pdf"
        )
    except Exception as e:
        return jsonify({"error": "PDF generation failed", "detail": str(e)}), 500

@pdf_bp.route("/pdf/to-word", methods=["POST"])
def to_word():
    # Placeholder for PDF to Word logic 
    # Usually requires pdf2docx: pip install pdf2docx
    return jsonify({
        "message": "PDF to Word conversion is being initialized. Please ensure pdf2docx is installed in the environment.",
        "status": "coming_soon"
    }), 501
