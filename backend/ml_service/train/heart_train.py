# heart_train.py

import numpy as np
import pandas as pd
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from xgboost import XGBClassifier
from sklearn.metrics import precision_recall_curve
import joblib

# ============================================
# LOAD DATA
# ============================================
df = pd.read_csv("../datasets/heart_dataset.csv")   

# Target column
X = df.drop("condition", axis=1)
y = df["condition"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=42
)

# ============================================
# PREPROCESSING
# ============================================
numerical_features = ["age", "trestbps", "chol", "thalach", "oldpeak"]
categorical_features = ["sex", "cp", "fbs", "restecg", "exang", "slope", "ca", "thal"]

preprocessor = ColumnTransformer(
    [
        ("num", StandardScaler(), numerical_features),
        ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), categorical_features),
    ]
)

# Handle class imbalance
neg, pos = y_train.value_counts()[0], y_train.value_counts()[1]
scale_pos_weight = neg / pos

# ============================================
# MODEL
# ============================================
model = XGBClassifier(
    objective="binary:logistic",
    eval_metric="logloss",
    learning_rate=0.05,
    max_depth=4,
    n_estimators=250,
    colsample_bytree=0.8,
    gamma=0.2,
    random_state=42,
    scale_pos_weight=scale_pos_weight,
)

pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", model),
])

pipeline.fit(X_train, y_train)

# ============================================
# OPTIMAL THRESHOLD
# ============================================
y_proba = pipeline.predict_proba(X_test)[:, 1]
precision, recall, thresholds = precision_recall_curve(y_test, y_proba)
f1_scores = (2 * precision * recall) / (precision + recall)
f1_scores = np.nan_to_num(f1_scores)

best_idx = np.argmax(f1_scores)
optimal_threshold = float(thresholds[best_idx])

# ============================================
# SAVE MODEL FOR BACKEND
# ============================================

# Ensure models folder exists
os.makedirs("../models", exist_ok=True)

# Save inside /models/
joblib.dump(
    {"pipeline": pipeline, "threshold": optimal_threshold},
    "../models/heart_model.pkl"
)

print("Model saved at: models/heart_model.pkl")
