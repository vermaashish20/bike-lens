from sqlalchemy import Column, Integer, String, Float
from .database import Base

class Bike(Base):
    __tablename__ = "bikes"

    id = Column(Integer, primary_key=True, index=True)
    brand = Column(String, index=True)
    model = Column(String, index=True)
    cc = Column(Integer)
    segment = Column(String, index=True)
    year = Column(Integer)
    speedometer_type = Column(String)
    top_speed_kmh = Column(Integer)
    mileage_kmpl = Column(Float)
    fuel_tank_liters = Column(Float)
    factory_price_inr = Column(Float)
    gst_rate_pct = Column(Float)
    gst_amount_inr = Column(Float)
    ex_showroom_inr = Column(Float)
    on_road_price_inr = Column(Float)
    overall_score = Column(Float)
    price_increase_scenario_pct = Column(Float)
    buyer_behaviour = Column(String)
    price_sensitivity = Column(String)
