from app import app
from database import db
from models import User


with app.app_context():

    User.query.delete()

    db.session.commit()


print("Database cleared")