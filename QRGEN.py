# v42 - QRGEN.py
#Usage: python3 QRGEN.py [htmlfilehere.html] [nameofoutput.png]
#!/usr/bin/env python3
import zlib
import base64
import sys
import os
import qrcode

# Modified wrapper template to use gzip decompression instead of deflate
WRAPPER_TEMPLATE = (
"""<script type="module">\
document.open();document.write(await new Response(new Response(Uint8Array.from(atob("{b64}"), c => c.charCodeAt(0))).body.pipeThrough(new DecompressionStream("gzip"))).text());document.close();\
</script>"""
)

def main():
    if len(sys.argv) < 2:
        print("Usage: {} <game.html> [output.png]".format(os.path.basename(sys.argv[0])))
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) >= 3 else "qrcode.png"

    # Read the game HTML file as binary
    with open(input_file, 'rb') as f:
        html_data = f.read()

    # Compress the HTML with gzip format
    # Using wbits=31 for gzip format (16+15)
    compressor = zlib.compressobj(level=9, wbits=31)
    compressed = compressor.compress(html_data) + compressor.flush()

    # Base64 encode the compressed data
    b64_compressed = base64.b64encode(compressed).decode('ascii')

    # Insert the compressed data into the self-extracting wrapper
    final_html = WRAPPER_TEMPLATE.format(b64=b64_compressed)

    # Check that the final self-extracting HTML is within the 3KB limit
    final_size = len(final_html.encode('utf-8'))
    if final_size > 3072:
        print(f"Warning: Final self-extracting HTML is {final_size} bytes, which exceeds 3KB!")
    else:
        print(f"Final size: {final_size} bytes (within 3KB).")

    # Create a data URI from the self-extracting HTML
    data_uri = "data:text/html;base64," + base64.b64encode(final_html.encode('utf-8')).decode('ascii')

    print(data_uri)

    # Generate the QR code from the data URI
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data_uri)
    try:
        qr.make(fit=True)
    except ValueError as e:
        print("Warning: fitting QR code failed with error:", e)
        print("Forcing version 40 and using fit=False")
        qr = qrcode.QRCode(
            version=40,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(data_uri)
        qr.make(fit=False)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(output_file)

    print(f"QR code saved to {output_file}.")
    print("When scanned, the QR code opens a self-extracting page that loads your game.")

if __name__ == '__main__':
    main()
