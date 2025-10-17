from fastapi import APIRouter
from backend.API.src.database.requests.homework import *
from backend.API.src.schemas.homework import *
router = APIRouter(prefix="/homework", tags=["Домашнее задание"])


@router.get('/group_id')
async def get_group_homework(group_id: int) -> list[HomeworkGet]:
    homeworks = await get_group_homeworks_by_id(group_id)
    return homeworks


@router.post('/')
async def create_new_homework(homework: HomeworkCreateSchema):
    await create_homework(homework)
    return {'message': 'OK'}


@router.delete('/homework_id')
async def delete_homework_by_id(homework_id: int):
    await delete_homework(homework_id)
    return {'message': 'OK'}