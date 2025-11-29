from fastapi import APIRouter
import pandas as pd
import joblib

router = APIRouter()

# Load trained model and threshold
package = joblib.load("models/heart_model.pkl")
pipeline = package["pipeline"]
threshold = package["threshold"]

@router.post("/heart")
def predict_heart(data: dict):
    # Convert input JSON into a DataFrame row
    df = pd.DataFrame([data])

    # Predict probability
    proba = pipeline.predict_proba(df)[0][1]

    # Apply threshold to convert into class label
    prediction = int(proba >= threshold)

    return {
        "probability": float(proba),
        "prediction": prediction
    }
