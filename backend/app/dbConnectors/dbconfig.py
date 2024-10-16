import os
from dotenv import load_dotenv


def db_config():
    load_dotenv()

    db_config_read = {
        "host": os.getenv("DB_HOST_READ"),
        "user": os.getenv("DB_USERNAME_READ"),
        "password": os.getenv("DB_PASSWORD_READ"),
        "database": os.getenv("DB_DATABASE_READ"),
    }

    db_config_write = {
        "host": os.getenv("DB_HOST_WRITE"),
        "user": os.getenv("DB_USERNAME_WRITE"),
        "password": os.getenv("DB_PASSWORD_WRITE"),
        "database": os.getenv("DB_DATABASE_WRITE"),
    }

    return db_config_read, db_config_write
