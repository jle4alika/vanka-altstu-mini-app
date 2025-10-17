from backend.API.src.database.models import *
from sqlalchemy import select, update

from backend.API.src.database.db import async_session


async def change_group_deputy(group_id: int, deputy_id: int):
    async with async_session() as session:
        await session.execute(
            update(Group)
            .where(Group.id == group_id)
            .values(deputy_id=deputy_id)
        )
        await session.commit()


async def add_group_member(group_id: int):
    async with async_session() as session:
        await session.execute(
            update(Group)
            .where(Group.id == group_id)
            .values(members_count=Group.members_count + 1)
        )
        await session.commit()



async def create_group(new_group) -> Group:
    async with async_session() as session:
        group = Group(**new_group.model_dump())
        session.add(group)
        await session.flush(group)
        await session.commit()

        return await session.scalar(select(Group).where(Group.id == group.id))













