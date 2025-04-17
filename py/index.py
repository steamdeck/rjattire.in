from flask import Flask, render_template
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route("/")
def home():
    xml_url = "https://rjattire.in/sitemap_products_2.xml?from=9612373819639&to=9638349537527"
    response = requests.get(xml_url)
    soup = BeautifulSoup(response.content, "xml")
    image_urls = [img.text for img in soup.find_all("image:loc")]
    return render_template("index.html", images=image_urls)

if __name__ == "__main__":
    app.run(debug=True)
