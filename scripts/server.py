import http.server
import socketserver
import os
import sys
import urllib.parse

PORT = 8093
DIRECTORY = "/root/ClubeMkt/operus/docs"

class OperusVaultHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_HEAD(self):
        self.route_request()
        return super().do_HEAD()

    def do_GET(self):
        self.route_request()
        return super().do_GET()

    def route_request(self):
        parsed = urllib.parse.urlparse(self.path)
        clean = parsed.path.strip('/')
        # Route anything under /operus or root to index.html if not a specific file
        if clean == '' or clean == 'operus' or clean == 'operus/' or not os.path.exists(os.path.join(DIRECTORY, clean)):
            self.path = '/index.html'

if __name__ == '__main__':
    os.chdir(DIRECTORY)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("0.0.0.0", PORT), OperusVaultHandler) as httpd:
        print(f"Operus Vault Server running on port {PORT}")
        httpd.serve_forever()
