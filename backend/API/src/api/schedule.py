from fastapi import APIRouter
from backend.API.src.schemas.schedule import *
from backend.API.src.database.requests.schedule import *

router = APIRouter(prefix="/schedules", tags=["Расписание"])


@router.get('/group_id')
async def get_group_schedule(group_id: int) -> list[ScheduleSchema]:
    lessons = await get_group_schedule_by_id(group_id)
    return lessons

