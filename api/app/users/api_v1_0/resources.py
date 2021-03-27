from flask import request, Blueprint
from flask_restful import Api, Resource

from .schemas import UserSchema
from ..models import User

user_v1_0_bp = Blueprint('user_v1_0_bp', __name__)

user_schema = UserSchema()

api = Api(user_v1_0_bp)

class UsersListResource(Resource):
    # To get an user
    def get(self):
        users = User.get_all()
        result = user_schema.dump(users, many=True)
        return result

    # To add an user
    def post(self):
        # data = request.get_json()
        users = request.get_json()
        # users = user_schema.load(data)
        user = User(name=users['name'],
                    lastname=users['lastname'],
                    age=users['age']
        )
        user.save()
        # resp = user_schema.dump(user)
        # return resp, 201
        return {"response": "User added"}

api.add_resource(UsersListResource, '/api/v1.0/users/', endpoint='users_list_resource')

class UserResource(Resource):
    def get(self, user_id):
        user = User.get_by_id(user_id)
        result = user_schema.dump(user)
        return result

    def put(self, user_id):
        print("IN PUT")
        user = User.get_by_id(user_id)
        user.name = request.json["name"]
        user.lastname = request.json["lastname"]
        user.age = request.json["age"]
        user.save()
        return {"response": "User updated"}

    def delete(self, user_id):
        user = User.get_by_id(user_id)
        if user:
            user.delete()
            return {"response": "User deleted"}
        return {"response": "User not exist, error."}

api.add_resource(UserResource, '/api/v1.0/users/<int:user_id>/', endpoint="user_resource")


