from fastapi import FastAPI
from server.diabetes_api import router as diabetes_router
from server.parkinson_api import router as parkinson_router
from server.heart_api import router as heart_router
import uvicorn

app = FastAPI(
    title="HealthPredict ML Service",
    description="Machine Learning Microservice for Disease Prediction",
    version="1.0.0",
)

# Register routers
app.include_router(diabetes_router, prefix="/predict")
app.include_router(parkinson_router, prefix="/predict")
app.include_router(heart_router, prefix="/predict")

if __name__ == "__main__":
    uvicorn.run("run:app", host="0.0.0.0", port=8001, reload=True)
