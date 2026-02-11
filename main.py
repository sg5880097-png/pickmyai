from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

API_KEY = "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"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    msg = request.json["message"]

    r = requests.post(
        "https://api.arcee.ai/v1/chat/completions",
        headers={"Authorization": f"Bearer {API_KEY}"},
        json={
            "model":"arcee-ai/trinity-large-preview:free",
            "messages":[{"role":"user","content":msg}]
        }
    )

    return jsonify(r.json())

import os
port = int(os.environ.get("PORT", 5000))
app.run(host="0.0.0.0", port=port)
