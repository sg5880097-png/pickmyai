from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

API_KEY = "PASTE_API_KEY"

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

app.run()
