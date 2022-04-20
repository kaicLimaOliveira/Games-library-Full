from flask import Blueprint, request
from controllers.GamesController import Games 


pages = Blueprint('pages', __name__, url_prefix='/')

@pages.route('games', methods=['GET', 'POST'])
def new_game():
    return Games().new_game(request)

@pages.route('updated_game', methods=['POST'])
def update_game():
    return Games().update_game(request)

@pages.route('delete_game', methods=['POST'])
def delete_game():
    return Games().delete_game(request)


