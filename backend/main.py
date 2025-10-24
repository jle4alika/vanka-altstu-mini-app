import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import uvicorn
import asyncio

from fastapi import FastAPI
from backend.API.src.database.db import async_main
from fastapi.middleware.cors import CORSMiddleware

from backend.API.src.api import global_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["127.0.0.1"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(global_router)


if __name__ == '__main__':
    asyncio.run(async_main())
    uvicorn.run("main:app",
                reload=True)