from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import routes
import uvicorn
import json
from flask_cors import CORS

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(routes.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)