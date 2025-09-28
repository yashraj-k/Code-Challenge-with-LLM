from sqlalchemy import Column , Integer,String , DateTime , create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from dotenv import load_dotenv
import os


load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL")


engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base = declarative_base()

class Challenge(Base):
    __tablename__ = "challenge"
    id = Column(Integer , primary_key=True)
    difficulty = Column(String , nullable=False)
    date_created = Column(DateTime , default=datetime.now)
    created_by = Column(String , nullable=False)
    title = Column(String , nullable=False)
    options = Column(String , nullable=False)
    correct_answer_id = Column(Integer , nullable=False)
    explanation = Column(String , nullable = False)

class ChallengeQuota(Base):
    __tablename__ = "challenge_quota"
    id = Column(Integer , primary_key = True)
    user_id = Column(String , nullable=False , unique=True)
    quota_remaining = Column(Integer , nullable=False ,default=5)
    last_reset_date = Column(DateTime , default=datetime.now)

Base.metadata.create_all(engine)

SessionLocal = sessionmaker(autocommit= False , autoflush= False , bind= engine)

def get_db():
    db= SessionLocal()
    try:
        yield db
    finally:
        db.close()
