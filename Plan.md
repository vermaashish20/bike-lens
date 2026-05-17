# Backend Implementation Plan: Bikelens

This document outlines the step-by-step plan for building the FastAPI backend, setting up the PostgreSQL database using SQLAlchemy, seeding it with the provided CSV data, and connecting it to the Next.js frontend.

## 1. Tech Stack Overview
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Database Driver**: `psycopg` (binary)
- **Data Source**: `indian_bikes_dataset_1000.csv`

## 2. Implementation Steps

### Step 1: Database Setup & ORM Configuration
- Create the SQLAlchemy engine and session management (`database.py`).
- Define the `Bike` model in SQLAlchemy (`models.py`) mapping directly to the CSV columns:
  - `brand`, `model`, `cc`, `segment`, `year`, `speedometer_type`, `top_speed_kmh`, `mileage_kmpl`, `fuel_tank_liters`, `factory_price_inr`, `gst_rate_pct`, `gst_amount_inr`, `ex_showroom_inr`, `on_road_price_inr`, `overall_score`, `price_increase_scenario_pct`, `buyer_behaviour`, `price_sensitivity`.

### Step 2: Data Seeding Script
- Create a script (`seed.py`) using `pandas` or Python's native `csv` module.
- The script will read `indian_bikes_dataset_1000.csv`, instantiate SQLAlchemy `Bike` objects, and bulk insert them into the PostgreSQL database.

### Step 3: FastAPI Endpoints (API Layer)
Build RESTful endpoints in `main.py` (or a dedicated router):
- `GET /api/bikes`: Returns a list of all bikes (supports query parameters for filtering by segment, cc, or price range).
- `GET /api/bikes/{bike_id}`: Returns full details for a specific bike.
- `GET /api/bikes/featured`: Returns a curated list of bikes for the homepage and side panels (e.g., Top Mileage, Smart Deals).
*Note: For the AI/ML attributes (e.g., "AI Value Score", "Residual Error", "Feature Importance"), the API will return mocked/randomized data for now, as requested, until the actual ML models are integrated.*

### Step 4: Frontend Integration (Next.js)
- Update `client/app/page.tsx`, `client/app/explorer/page.tsx`, and `client/app/bike/[id]/page.tsx` to use React Server Components `fetch()` or `useEffect` to pull data from `http://localhost:8000/api/...`.
- Replace the current hardcoded arrays (`MASONRY_BIKES`, `SIDE_MILEAGE_BIKES`, etc.) with dynamic data fetched from the PostgreSQL database.

---

## 3. Backend File Structure

```text
bikelens/
├── server/
│   ├── main.py                 # FastAPI application instance and router inclusion
│   ├── database.py             # SQLAlchemy engine and session local definitions
│   ├── models.py               # SQLAlchemy ORM models (Bike table)
│   ├── schemas.py              # Pydantic models for API request/response validation
│   ├── seed.py                 # Script to populate PostgreSQL from the CSV
│   └── requirements.txt        # Python dependencies (fastapi, uvicorn, sqlalchemy, psycopg, pandas)
├── client/                     # (Existing Next.js frontend)
├── indian_bikes_dataset_1000.csv # The source dataset
└── Plan.md                     # This document
```

## 4. Execution Order
1. Write `requirements.txt` and install dependencies.
2. Create `database.py`, `models.py`, and `schemas.py`.
3. Create `seed.py` and run it to populate the local PostgreSQL database.
4. Create `main.py` with the necessary API routes.
5. Start the FastAPI server (`uvicorn main:app --reload`).
6. Update the Next.js frontend to fetch from the FastAPI backend.
