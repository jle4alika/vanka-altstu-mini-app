from backend.API.src.database.models import *
from sqlalchemy import select

from backend.API.src.database.db import async_session


async def get_group_schedule_by_id(group_id: int) -> list[Schedule]:
    async with async_session() as session:
        query = select(Schedule).where(Schedule.group_id == group_id)
        result = await session.execute(query)
        return result.scalars().all()


async def create_schedule(new_schedule):
    async with async_session() as session:
        schedule = Schedule(**new_schedule.model_dump())
        session.add(schedule)
        await session.commit()








