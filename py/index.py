from flask import Flask, render_template, jsonify
from flask_cors import CORS  # 👈 Add this
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)  # 👈 Enable CORS for all routes

@app.route("/images")
def get_images():
    xml_url = "https://rjattire.in/sitemap_products_2.xml?from=9612373819639&to=9638349537527"
    response = requests.get(xml_url)
    soup = BeautifulSoup(response.content, "xml")
    image_urls = [img.text for img in soup.find_all("image:loc")]

    # Optional: filter only Shopify CDN images and exclude logo
    image_urls = [url for url in image_urls if "cdn.shopify.com" in url and "logo" not in url.lower()]
    return jsonify(image_urls)

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
