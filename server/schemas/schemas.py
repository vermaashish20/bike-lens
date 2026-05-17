from pydantic import BaseModel
from typing import Optional

class BikeBase(BaseModel):
    brand: str
    model: str
    cc: int
    segment: str
    year: int
    speedometer_type: str
    top_speed_kmh: int
    mileage_kmpl: float
    fuel_tank_liters: float
    factory_price_inr: float
    gst_rate_pct: float
    gst_amount_inr: float
    ex_showroom_inr: float
    on_road_price_inr: float
    overall_score: float
    price_increase_scenario_pct: float
    buyer_behaviour: str
    price_sensitivity: str

class BikeResponse(BikeBase):
    id: int
    
    # Mock AI/ML fields for frontend
    ai_value_score: Optional[int] = None
    ai_badge: Optional[str] = None
    
    class Config:
        from_attributes = True
