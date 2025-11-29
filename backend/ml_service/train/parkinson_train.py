"""Training script for the Parkinson disease classifier."""
from pathlib import Path
import os

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from xgboost import XGBClassifier
from sklearn.metrics import precision_recall_curve
import joblib

# ============================================
# LOAD DATA
# ============================================
DATA_PATH = Path(__file__).resolve().parent / "../datasets/parkinsons.data"
df = pd.read_csv(DATA_PATH)

# Drop name column if present
if "name" in df.columns:
    df = df.drop(columns=["name"])

# Features & target
X = df.drop(columns=["status"])
y = df["status"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, stratify=y, random_state=42
)

# ============================================
# BUILD PIPELINE
# ============================================
pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("xgb", XGBClassifier(
        objective="binary:logistic",
        use_label_encoder=False,
        eval_metric="aucpr",
        n_estimators=300,
        max_depth=4,
        learning_rate=0.03,
        subsample=0.9,
        colsample_bytree=0.9,
        random_state=42
    ))
])

pipeline.fit(X_train, y_train)

# ============================================
# THRESHOLD TUNING (PR F1)
# ============================================
y_proba = pipeline.predict_proba(X_test)[:, 1]

precision, recall, thresholds = precision_recall_curve(y_test, y_proba)

# F1 scores
f1_scores = (2 * precision * recall) / (precision + recall)
f1_scores = np.nan_to_num(f1_scores)

best_idx = np.argmax(f1_scores)

# Handle mismatch
if best_idx >= len(thresholds):
    optimal_threshold = 0.5
else:
    optimal_threshold = float(thresholds[best_idx])

print("Optimal threshold:", optimal_threshold)

# ============================================
# SAVE MODEL FOR BACKEND 
# ============================================
os.makedirs("../models", exist_ok=True)

save_path = "../models/parkinson_model.pkl"

joblib.dump(
    {"pipeline": pipeline, "threshold": optimal_threshold},
    save_path
)

print("Saved:", save_path)
