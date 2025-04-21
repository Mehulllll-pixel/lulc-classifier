from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or set your frontend URL for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    # Read and process image
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    image = image.resize((64, 64))
    data = np.array(image) / 255.0

    # Fake prediction (we'll replace this later)
    return {"class": "Urban", "confidence": 0.95}
