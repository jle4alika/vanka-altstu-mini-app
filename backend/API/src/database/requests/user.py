from backend.API.src.database.models import *
from sqlalchemy import select

from backend.API.src.database.db import async_session


async def get_user(id: int) -> User:
    async with async_session() as session:
        query = select(User).where(User.id == id)
        result = await session.execute(query)
        return result.scalar_one_or_none()


async def get_all_users() -> list[User]:
    async with async_session() as session:
        query = select(User)
        result = await session.execute(query)
        return result.scalars().all()


async def create_user(new_user) -> User:
    async with async_session() as session:
        user = User(**new_user.model_dump())
        session.add(user)
        await session.flush(user)
        await session.commit()

        return await session.scalar(select(User).where(User.id == user.id))

