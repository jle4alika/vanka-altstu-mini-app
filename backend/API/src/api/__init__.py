from fastapi import APIRouter

from backend.API.src.api.group import router as group_router
from backend.API.src.api.user import router as user_router
from backend.API.src.api.schedule import router as schedule_router
from backend.API.src.api.homework import router as homework_router

global_router = APIRouter()

global_router.include_router(group_router)
global_router.include_router(user_router)
global_router.include_router(schedule_router)
global_router.include_router(homework_router)

