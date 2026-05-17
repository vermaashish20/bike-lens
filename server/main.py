from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional

from db.database import get_db, Base, engine
from db.models import Bike
from schemas.schemas import BikeResponse

app = FastAPI(title="Bikelens API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def add_mock_ai_fields(bike: Bike) -> dict:
    """Mock AI logic to add badges/scores based on basic heuristics for now."""
    bike_dict = {c.name: getattr(bike, c.name) for c in bike.__table__.columns}
    
    # Simple mocked logic based on overall_score
    score = int(bike.overall_score)
    bike_dict['ai_value_score'] = score
    
    if score >= 80:
        bike_dict['ai_badge'] = "Excellent"
    elif score >= 65:
        bike_dict['ai_badge'] = "Good"
    else:
        bike_dict['ai_badge'] = "Fair"
        
    return bike_dict

@app.get("/api/bikes", response_model=List[BikeResponse])
def get_bikes(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    segment: Optional[str] = None,
    brand: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    min_cc: Optional[int] = None,
    max_cc: Optional[int] = None,
    min_mileage: Optional[float] = None,
    sort_by: Optional[str] = None
):
    query = db.query(Bike)
    
    if segment:
        query = query.filter(Bike.segment == segment)
    if brand:
        query = query.filter(Bike.brand == brand)
    if min_price is not None:
        query = query.filter(Bike.ex_showroom_inr >= min_price)
    if max_price is not None:
        query = query.filter(Bike.ex_showroom_inr <= max_price)
    if min_cc is not None:
        query = query.filter(Bike.cc >= min_cc)
    if max_cc is not None:
        query = query.filter(Bike.cc <= max_cc)
    if min_mileage is not None:
        query = query.filter(Bike.mileage_kmpl >= min_mileage)

    if sort_by == "ai_score":
        query = query.order_by(Bike.overall_score.desc())
    elif sort_by == "price_asc":
        query = query.order_by(Bike.ex_showroom_inr.asc())
    elif sort_by == "price_desc":
        query = query.order_by(Bike.ex_showroom_inr.desc())
    elif sort_by == "mileage_desc":
        query = query.order_by(Bike.mileage_kmpl.desc())
        
    bikes = query.offset(skip).limit(limit).all()
    return [add_mock_ai_fields(b) for b in bikes]

@app.get("/api/bikes/featured", response_model=List[BikeResponse])
def get_featured_bikes(db: Session = Depends(get_db)):
    # Grab a few distinct bikes for the homepage (mocking top deals by score)
    bikes = db.query(Bike).order_by(Bike.overall_score.desc()).limit(12).all()
    return [add_mock_ai_fields(b) for b in bikes]

@app.get("/api/bikes/{bike_id}", response_model=BikeResponse)
def get_bike(bike_id: int, db: Session = Depends(get_db)):
    bike = db.query(Bike).filter(Bike.id == bike_id).first()
    if not bike:
        return {"error": "Not found"}
    return add_mock_ai_fields(bike)

@app.get("/")
async def root():
    return {"message": "Welcome to Bikelens API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)