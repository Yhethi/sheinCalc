from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/api/price', methods=['GET'])
def get_price():
    url = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search"
    headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
    }
    # Los datos pueden variar según el tipo de transacción (compra/venta), fiat, y la cripto deseada
    data = {
        "asset": "USDT",  # O cualquier otra criptomoneda como BTC, BNB, etc.
        "fiat": "VES",
        "tradeType": "BUY",  # Puede ser BUY o SELL
        "page": 1,
        "rows": 10,  # Solo solicitamos el primer resultado
        "payTypes": [],
        "countries": [],
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        resultado = response.json()
        primer_anuncio = resultado.get('data', [])[0]
        precio = primer_anuncio.get('adv', {}).get('price')
        return precio
    else:
        return f"Error: {response.status_code}"

if __name__ == '__main__':
    app.run(port=5001)