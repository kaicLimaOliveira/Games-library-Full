from flask import Flask
from routers import GamesRoute
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.register_blueprint(GamesRoute.pages)

if __name__ == '__main__':
    app.run(host='localhost', port=4000, debug=True)
