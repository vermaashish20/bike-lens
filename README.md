# Bikelens

**Bikelens** is an experimental, futuristic consumer platform designed to explore how next-generation web applications will operate. Built from the ground up as an **AI-Native** application, Bikelens doesn't just display data—it understands it. 

Our goal is to demonstrate a near-future paradigm where artificial intelligence is not a bolted-on chatbot, but the core engine driving the entire user experience. Bikelens bypasses marketing hype by using deep machine learning to provide consumers with unbiased vehicle valuations, real-time market trends, predictive analytics, and an integrated conversational AI Bike Advisor.

## Product Requirements Document (PRD)

### 1. The "Fair Value" & Market Anomaly Engine (Regression & Residual Analysis)
Instead of predicting the outright price, the platform calculates a **justifiable price** based purely on engineering assets.
- **ML Approach:** Train a robust regressor (e.g., Random Forest or Gradient Boosting) using independent technical features (`cc`, `mileage_kmpl`, `fuel_tank_liters`, `top_speed_kmh`, `segment`) to predict `ex_showroom_inr`.
- **Application Feature:** Calculate the *Residual Error* (Actual Price - Predicted Price) for incoming data.
  - Highlights **"Underpriced Gem"** (High-Value Proposition) if the actual price sits significantly below the predicted value.
  - Highlights **"Overpriced Hype Train"** (Premium Markup) if the actual price charges a massive premium relative to the underlying mechanics.

### 2. Smart Competitive Benchmarking (Unsupervised Clustering)
Automates the identification of a vehicle's true market rivals based on data footprints rather than traditional marketing tags.
- **ML Approach:** Use clustering algorithms (e.g., **K-Means** or **HDBSCAN**) mapping data across normalized multi-dimensional features (combining performance, economics, and rating vectors).
- **Application Feature:** Upon selecting a bike, the dashboard identifies its mathematical "peer group" and ranks it against true algorithmic competitors on a balance of `overall_score` vs `on_road_price_inr`.

### 3. Brand Pricing Consistency & Positioning Index (Statistical ML)
Evaluates if brands are pricing logically or aggressively.
- **ML Approach:** Train per-brand regression models or use hierarchical linear modeling to map the pricing trajectory of each manufacturer across their portfolio.
- **Application Feature:** Generates a **"Brand Strategy Scorecard"**.
  - High $R^2$: Predictable, value-driven pricing structures.
  - Low $R^2$: Aggressive or inconsistent marketing-driven pricing strategies.

### 4. Feature Importance Explainer (Explainable AI - XAI)
Provides transparency into why vehicles get high ratings or suffer from extreme price sensitivity.
- **ML Approach:** Use **SHAP** (SHapley Additive exPlanations) or **LIME** integrated directly onto trained models (`overall_score` regressor or `buyer_behaviour` classifier).
- **Application Feature:** Dashboard displays a localized feature-contribution plot breaking down variables driving the outcome (e.g., how much engine capacity or mileage contributed to pushing its score up or down).

### 5. Market Shock Simulator (Classification)
Predicts consumer psychological and behavioral shifts when macro-economic conditions change.
- **ML Approach:** Multi-class classification model (e.g., XGBoost, LightGBM, or CatBoost) trained on technical specs combined with a dynamic inflation parameter (`price_increase_scenario_pct`).
- **Application Feature:** Simulates "What-If" tax or inflation scenarios to predict shifts in `buyer_behaviour` (e.g., *Proceeding with buy*, *Postponing purchase*, *Switching to lower segment*) and `price_sensitivity`.

### 6. Conversational Auto Analyst & Insights (GenAI / LLM)
Utilizes local, highly efficient models (e.g., Gemma 4 / Llama 3 via Ollama) to build high-performance language features.
- **Conversational Interface:** LLM Agent with access to a SQL database and Trained ML Models to answer natural language queries (e.g., "What happens if manufacturing costs spike by 12%?" or "Show me all bikes under 2 Lakhs that have low price sensitivity").
- **Automated Report Generation:** One-click generation of professional market intelligence documentation, detailing market trends, risk vulnerabilities, and anomaly highlights based on dataset updates and ML insights.

---

## AI/ML Pipeline & Models

To power the futuristic UI, the platform relies on four distinct types of machine learning models acting in concert:

### 1. Supervised Regression Models (The "Fair Value" Engine)
- **Purpose:** Predicts what a bike *should* cost based entirely on its physical hardware (ignoring marketing hype). Used to calculate residual error and identify "Smart Deals" or "Overpriced" alerts.
- **Algorithms:** **XGBoost Regressor** or **Random Forest Regressor**.
- **Features:** `cc`, `mileage_kmpl`, `power_bhp`, `weight_kg`, `fuel_tank_liters`, `top_speed_kmh`.
- **Target:** `predicted_ex_showroom_price`.

### 2. Unsupervised Clustering Models (Competitor Grouping)
- **Purpose:** Discovers mathematical "peer groups" instead of relying on rigid, traditional marketing segments. It might discover that a premium 150cc actually competes against a budget 200cc.
- **Algorithms:** **HDBSCAN** (handles varying cluster densities and outliers efficiently).
- **Features:** Normalized multi-dimensional vectors combining performance, price, and economy.

### 3. Explainable AI Wrappers (XAI)
- **Purpose:** Provides complete transparency to the user. Breaks down the exact engineering specs that pulled the AI Value Score up or down (e.g., "Engine CC: +15, Mileage: -5").
- **Algorithms:** **SHAP** (SHapley Additive exPlanations) wrapped around the core XGBoost regressor.

### 4. Agentic Large Language Models (AI Bike Advisor)
- **Purpose:** Powers the conversational, context-aware interface. Understands user intent, filters the SQL database, checks the Fair Value Engine, and returns intelligent, conversational UI components.
- **Algorithms:** Local LLMs like **Llama 3 (8B)** or **Gemma 2** (via Ollama), integrated with **LangChain** or **LlamaIndex** using Tool/Function calling capabilities.

---

## Project File Structure

```text
bikelens/
├── client/                     # Frontend Application (Next.js)
│   ├── app/                    # Next.js App Router
│   ├── public/                 # Static assets
│   ├── next.config.ts          # Next.js configuration
│   ├── package.json            # Frontend dependencies
│   └── README.md               # Client-specific documentation
├── server/                     # Proposed Backend & ML Services
│   ├── api/                    # API Endpoints (FastAPI / Flask)
│   ├── models/                 # ML Models (Regression, Clustering, XGBoost)
│   ├── data/                   # Datasets and preprocessing scripts
│   ├── services/               # GenAI, SHAP explainer, and core logic
│   └── requirements.txt        # Backend Python dependencies
├── README.md                   # Project Overview and PRD (This File)
└── .gitignore                  # Git ignore rules
```
