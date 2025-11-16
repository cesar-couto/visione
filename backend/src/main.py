from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import router as api_router

app = FastAPI()

# --- CORS Configuration ---
# Define the list of origins that are allowed to make requests.
# For our MVP, this is just the frontend development server.
origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods (GET, POST, etc.)
    allow_headers=["*"], # Allow all headers
)

# --- API Router ---
app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Cognitive Vision API"}
