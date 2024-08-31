from service.UsersService import UsersService
from secureService.SecureService import SecureService
from module.UserResponse import UserResponce


class UsersMenuFunctions:

    @staticmethod
    def create_new_user(write_connector, data):

        email = data["email"]
        name = data["user_name"]

        result = UsersService.is_user_exist(
            write_connector, email, name)

        if not result:
            new_data = SecureService.hash_password(data["password"])

            final_data = [name, email, new_data]

            result = UsersService.add_new_user(write_connector, final_data)

            return {
                "is_success": result
            }

        else:
            user_email, user_name = result

            return {
                "is_success": False,
                "email": bool(user_email),
                "user_name": bool(user_name)
            }

    @staticmethod
    def get_exist_user(write_connector, data):
        email = data["email"]
        password = data["password"]

        user_id, user_name, db_password = UsersService.get_user(write_connector, email)

        secure_check = SecureService.password_comparison(user_id, password, db_password)

        if secure_check:
            return UserResponce(user_id, user_name, email)
        else:
            return {
                "is_success": False
            }
