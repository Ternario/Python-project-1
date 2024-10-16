from flask import Blueprint

from .films import bp as films_bp
from .genres import bp as genres_bp
from .actors import bp as actors_bp
from .authorization import bp as authorization_bp
from .favoritesList import bp as favorites_bp
from .topQueries import bp as queries_bp


bp = Blueprint("api", __name__, url_prefix="/api")

bp.register_blueprint(films_bp)
bp.register_blueprint(genres_bp)
bp.register_blueprint(actors_bp)
bp.register_blueprint(authorization_bp)
bp.register_blueprint(favorites_bp)
bp.register_blueprint(queries_bp)