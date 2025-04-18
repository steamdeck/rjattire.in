from flask import Flask, render_template, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

def get_image_urls():
    xml_url = "https://rjattire.in/sitemap_products_2.xml?from=9612373819639&to=9638349537527"
    response = requests.get(xml_url)
    soup = BeautifulSoup(response.content, "xml")
    return [img.text for img in soup.find_all("image:loc")]

@app.route("/")
def home():
    image_urls = get_image_urls()
    return render_template("index.html", images=image_urls)

@app.route("/images")
def image_json():
    image_urls = get_image_urls()
    return jsonify(image_urls)

if __name__ == "__main__":
    app.run(debug=True)
