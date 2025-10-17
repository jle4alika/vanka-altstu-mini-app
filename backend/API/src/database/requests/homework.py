from backend.API.src.database.models import *
from sqlalchemy import select, delete

from backend.API.src.database.db import async_session


async def get_group_homeworks_by_id(group_id: int):
    async with async_session() as session:
        query = select(Homework).where(Homework.group_id == group_id)
        result = await session.execute(query)
        return result.scalars().all()


async def get_all_users() -> list[User]:
    async with async_session() as session:
        query = select(User)
        result = await session.execute(query)
        return result.scalars().all()


async def create_homework(new_homework):
    async with async_session() as session:
        homework = Homework(**new_homework.model_dump())
        session.add(homework)
        await session.commit()


async def delete_homework(homework_id: int):
    async with async_session() as session:
        query = delete(Homework).where(Homework.id == homework_id)
        await session.execute(query)
        await session.commit()






