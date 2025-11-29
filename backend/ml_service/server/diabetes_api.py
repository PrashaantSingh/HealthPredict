from fastapi import APIRouter
import pandas as pd
import joblib

router = APIRouter()

# Load model package
package = joblib.load("models/diabetes_model.pkl")
pipeline = package["pipeline"]
threshold = package["threshold"]

@router.post("/diabetes")
def predict_diabetes(data: dict):
    # Convert incoming JSON to DataFrame
    df = pd.DataFrame([data])

    # Predict probability
    proba = pipeline.predict_proba(df)[0][1]

    # Apply threshold
    prediction = int(proba >= threshold)

    return {
        "probability": float(proba),
        "prediction": prediction
    }
