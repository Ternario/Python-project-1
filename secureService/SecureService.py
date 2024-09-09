from datetime import date
from uuid import uuid4

from argon2 import PasswordHasher


class SecureService:
    _argon_hasher = PasswordHasher(
        time_cost=16, memory_cost=2 ** 15, parallelism=2, hash_len=32, salt_len=16)
    _encoding_parameters = "$argon2id$v=19$m=32768,t=16,p=2$"

    @classmethod
    def hash_password(cls, password):
        current_date = str(date.today())

        user_id = str(uuid4())[-12:]

        salted_password = user_id + password

        try:
            password = cls._argon_hasher.hash(
                salted_password).split(",")[-1][4:]

            return user_id, password, current_date
        except Exception as e:
            return False

    @classmethod
    def password_comparison(cls, user_id, password, user_hash):
        full_password = user_id + password

        try:
            full_hash = cls._encoding_parameters + user_hash

            return cls._argon_hasher.verify(full_hash, full_password)
        except Exception as e:
            return False
