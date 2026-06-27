from app import app
from models import User


with app.app_context():

    users = User.query.all()


    print("TOTAL USERS:", len(users))


    for u in users:

        print(
            "ID:",u.id,
            "Name:",u.name,
            "Age:",u.age,
            "Weight:",u.weight,
            "Height:",u.height,
            "Goal:",u.goal
        )