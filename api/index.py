from flask import Flask, jsonify
import requests

app = Flask(__name__)

@app.route('/api/prices', methods=['GET'])
def get_price():
    url = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search"
    headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
    }
    data = {
        "asset": "USDT",
        "fiat": "VES",
        "tradeType": "BUY",
        "page": 1,
        "rows": 10,
        "payTypes": [],
        "countries": [],
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        resultado = response.json()
        primer_anuncio = resultado.get('data', [])[0]
        precio = primer_anuncio.get('adv', {}).get('price')
        return jsonify({"price": precio})
    else:
        return jsonify({"error": f"Error: {response.status_code}"}), response.status_code

@app.route('/api', methods=['GET'])
def hello_world():
    return "Hello, world!"

if __name__ == "__main__":
    app.run(port=5000)  # Vercel manejará el puerto automáticamente
