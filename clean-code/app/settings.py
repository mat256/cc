import os

POSTGRES_USER = os.environ["POSTGRES_USER"]
POSTGRES_PASSWORD = os.environ["POSTGRES_PASSWORD"]
POSTGRES_URL = os.environ["POSTGRES_URL"]
POSTGRES_PORT = os.environ["POSTGRES_PORT"]
POSTGRES_DB_NAME = os.environ["POSTGRES_DB_NAME"]
DATABASE_URL = (
    f"postgresql://{os.environ['POSTGRES_USER']}:{os.environ['POSTGRES_PASSWORD']}@"
    f"{os.environ['POSTGRES_URL']}:{os.environ['POSTGRES_PORT']}/{os.environ['POSTGRES_DB_NAME']}"
)
MAX_GET_LIMIT = 100
JWT_SECRET = os.environ["JWT_SECRET"]
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
ORIGINS = ["http://localhost:8081", "http://127.0.0.1:8081"]
