from fastapi import APIRouter
from backend.API.src.database.requests.user import *
from backend.API.src.database.requests.group import add_group_member
from backend.API.src.schemas.user import *

router = APIRouter(prefix="/users", tags=["Пользователь"])


@router.get('/')
async def get_users() -> list[UserSchema]:
    users = await get_all_users()
    return users


@router.post('/')
async def create_new_user(user: UserSchema):
    new_user = await create_user(user)
    await add_group_member(new_user.group_id)
    return {'message': 'OK'}


@router.get('/user_id')
async def get_user_by_id(user_id: int) -> UserSchema:
    user = await get_user(user_id)
    return user

