from flask import Blueprint, request, send_file, jsonify
from app.services.converter import convert_image

convert_bp = Blueprint("convert", __name__)

MAX_SIZE = 20 * 1024 * 1024  # 20MB

@convert_bp.route("/convert", methods=["POST"])
def convert():
    if "image" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["image"]
    target = request.form.get("format", "png").lower()
    quality = int(request.form.get("quality", 85))

    try:
        output = convert_image(file.read(), target, quality)
        filename = f"converted.{target}"
        return send_file(
            output,
            mimetype=f"image/{target}",
            as_attachment=True,
            download_name=filename
        )
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Conversion failed", "detail": str(e)}), 500