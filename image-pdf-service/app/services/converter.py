from PIL import Image
import io, os

SUPPORTED_FORMATS = {
    "jpg":  "JPEG",
    "jpeg": "JPEG",
    "png":  "PNG",
    "webp": "WEBP",
    "bmp":  "BMP",
    "gif":  "GIF",
    "tiff": "TIFF",
    "ico":  "ICO",
}

def convert_image(file_bytes, target_format, quality=85):
    fmt = SUPPORTED_FORMATS.get(target_format.lower())
    if not fmt:
        raise ValueError(f"Unsupported format: {target_format}")

    img = Image.open(io.BytesIO(file_bytes))

    # Handle transparency for formats that don't support it
    if fmt == "JPEG" and img.mode in ("RGBA", "LA", "P"):
        background = Image.new("RGB", img.size, (255, 255, 255))
        if img.mode == "P":
            img = img.convert("RGBA")
        background.paste(img, mask=img.split()[-1])
        img = background
    elif fmt == "JPEG":
        img = img.convert("RGB")
    elif fmt in ("PNG", "WEBP", "GIF", "TIFF", "ICO"):
        # Keep transparency if possible
        pass
    else:
        img = img.convert("RGB")

    output = io.BytesIO()
    save_kwargs = {"format": fmt}
    if fmt in ("JPEG", "WEBP"):
        save_kwargs["quality"] = quality
    if fmt == "PNG":
        save_kwargs["optimize"] = True

    img.save(output, **save_kwargs)
    output.seek(0)
    return output