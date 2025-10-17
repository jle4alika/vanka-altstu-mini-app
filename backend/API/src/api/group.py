from fastapi import APIRouter
from backend.API.src.schemas.group import GroupSchema
from backend.API.src.schemas.user import UserSchema
from backend.API.src.database.requests.group import create_group, add_group_member
from backend.API.src.database.requests.user import create_user

router = APIRouter(prefix="/groups", tags=["Группа"])



@router.post('/')
async def create_new_group(new_group: GroupSchema):
    group = await create_group(new_group)

    await create_user(UserSchema(
        tg_id=new_group.headman_id,
        group_id=group.id,
        is_headman=True
    ))

    await add_group_member(group.id)
    return {'message': 'OK'}