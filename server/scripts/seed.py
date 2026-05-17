import os
import sys
import pandas as pd

# Allow importing from the root server directory
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from db.database import engine, SessionLocal, Base
from db.models import Bike

# Path to the CSV file relative to the script (root of the repository)
CSV_PATH = "D:\\Projects\\bikelens\\indian_bikes_dataset_1000.csv"

def seed_db():
    print("Creating database tables...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    print(f"Reading CSV from {CSV_PATH}...")
    try:
        df = pd.read_csv(CSV_PATH)
    except FileNotFoundError:
        print(f"Error: Could not find {CSV_PATH}")
        return

    db = SessionLocal()
    
    print("Inserting data into database...")
    bikes_to_insert = []
    for _, row in df.iterrows():
        bike = Bike(
            brand=row['brand'],
            model=row['model'],
            cc=row['cc'],
            segment=row['segment'],
            year=row['year'],
            speedometer_type=row['speedometer_type'],
            top_speed_kmh=row['top_speed_kmh'],
            mileage_kmpl=row['mileage_kmpl'],
            fuel_tank_liters=row['fuel_tank_liters'],
            factory_price_inr=row['factory_price_inr'],
            gst_rate_pct=row['gst_rate_pct'],
            gst_amount_inr=row['gst_amount_inr'],
            ex_showroom_inr=row['ex_showroom_inr'],
            on_road_price_inr=row['on_road_price_inr'],
            overall_score=row['overall_score'],
            price_increase_scenario_pct=row['price_increase_scenario_pct'],
            buyer_behaviour=row['buyer_behaviour'],
            price_sensitivity=row['price_sensitivity']
        )
        bikes_to_insert.append(bike)
    
    db.bulk_save_objects(bikes_to_insert)
    db.commit()
    db.close()
    
    print(f"Successfully inserted {len(bikes_to_insert)} bikes into the database.")

if __name__ == "__main__":
    seed_db()
