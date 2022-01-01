import os
from dotenv import load_dotenv
load_dotenv()


SQLALCHOMEY_DATABASE_URI = os.getenv('DATABASE_URL')
SECRET_KEY = os.getenv("SECRET_KEY")
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
PASSWORD = os.getenv("PASSWORD")


if SQLALCHOMEY_DATABASE_URI and SQLALCHOMEY_DATABASE_URI.startswith("postgres://"):
    SQLALCHOMEY_DATABASE_URI = SQLALCHOMEY_DATABASE_URI.replace("postgres://", "postgresql://", 1)

