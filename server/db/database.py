import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Default to a local postgres DB named bike_lens. Change as needed.
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg://postgres:root@localhost:5432/bike_lens")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
