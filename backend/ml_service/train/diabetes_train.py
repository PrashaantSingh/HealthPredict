import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from xgboost import XGBClassifier
from sklearn.metrics import precision_recall_curve, classification_report
import joblib

RANDOM_STATE = 42
FILE_PATH = "diabetes_prediction_dataset.csv"   # Ensure this file is inside the model folder

def train_model():
    df = pd.read_csv(FILE_PATH)

    X = df.drop('diabetes', axis=1)
    y = df['diabetes']

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=RANDOM_STATE, stratify=y
    )

    numerical_features = ['age', 'bmi', 'HbA1c_level', 'blood_glucose_level']
    categorical_features = ['gender', 'smoking_history', 'hypertension', 'heart_disease']

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_features),
            ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), categorical_features)
        ],
        remainder='passthrough'
    )

    neg = y_train.value_counts()[0]
    pos = y_train.value_counts()[1]
    scale_pos_weight = neg / pos

    model = XGBClassifier(
        objective='binary:logistic',
        eval_metric='logloss',
        use_label_encoder=False,
        colsample_bytree=0.8,
        gamma=0.2,
        learning_rate=0.05,
        max_depth=6,
        n_estimators=350,
        random_state=RANDOM_STATE,
        scale_pos_weight=scale_pos_weight
    )

    pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', model)
    ])

    pipeline.fit(X_train, y_train)

    y_proba = pipeline.predict_proba(X_test)[:, 1]
    precision, recall, thresholds = precision_recall_curve(y_test, y_proba)
    f1_scores = (2 * precision * recall) / (precision + recall)
    f1_scores = np.nan_to_num(f1_scores)

    best_idx = np.argmax(f1_scores)
    optimal_threshold = thresholds[best_idx]

    y_pred_optimal = (y_proba >= optimal_threshold).astype(int)
    report = classification_report(y_test, y_pred_optimal)
    print("\n=== Final Model Evaluation ===")
    print(report)
    print(f"Optimal Threshold: {optimal_threshold:.4f}")

    model_package = {
        "pipeline": pipeline,
        "threshold": optimal_threshold
    }

    joblib.dump(model_package, "diabetes_model.pkl")
    print("Model saved as diabetes_model.pkl")

if __name__ == "__main__":
    train_model()
