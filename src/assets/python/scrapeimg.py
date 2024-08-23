from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from flask import Flask, jsonify, send_file
from io import BytesIO
import requests

app = Flask(__name__)

@app.route('/api/product-image', methods=['GET'])
def get_product_image():
    try:
        product_url = ''  # Reemplaza con la URL del producto
        
        # Configurar Selenium
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        service = Service('/path/to/chromedriver')  # Reemplaza con la ruta correcta a tu chromedriver
        driver = webdriver.Chrome(service=service, options=chrome_options)
        
        driver.get(product_url)
        
        # Encuentra la imagen del producto
        img_tag = driver.find_element_by_css_selector('img.crop-image-container__img')  # Actualiza con el selector correcto
        img_url = img_tag.get_attribute('src')
        
        img_response = requests.get(img_url)
        
        if img_response.status_code != 200:
            return jsonify({"error": "No se pudo obtener la imagen"}), 500
        
        img_data = BytesIO(img_response.content)
        
        driver.quit()
        
        return send_file(img_data, mimetype='image/jpeg')
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)