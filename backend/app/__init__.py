from flask import Flask, render_template
from flask_cors import CORS

from app.api import bp as api_bp

app = Flask(__name__, static_folder="../build/static", template_folder="..//build")
app.register_blueprint(api_bp)
CORS(app)


def create_app():
    @app.route("/")
    @app.route("/films")
    @app.route("/favorites_list")
    @app.errorhandler(404)
    def index(id=0):
        return render_template("index.html")
    return app
