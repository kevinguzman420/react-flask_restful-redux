from app.db import db, BaseModelMixin

class User(db.Model, BaseModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    lastname = db.Column(db.String(128), nullable=False)
    age = db.Column(db.Integer)

    def __init__(self, name, lastname, age):
        self.name = name
        self.lastname = lastname
        self.age = age

    def __repr__(self):
        return f'User({self.name})'

    def __str__(self):
        return f'{self.lastname}'
