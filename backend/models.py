from database import db


class User(db.Model):

    id=db.Column(
        db.Integer,
        primary_key=True
    )


    name=db.Column(
        db.String(50)
    )


    age=db.Column(
        db.Integer
    )


    gender=db.Column(
        db.String(20)
    )


    weight=db.Column(
        db.Float
    )


    height=db.Column(
        db.Float
    )


    goal=db.Column(
        db.String(50)
    )


    diabetes=db.Column(
        db.String(10)
    )