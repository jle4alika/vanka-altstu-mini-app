from pydantic import BaseModel, Field


class UserSchema(BaseModel):
    tg_id: int = Field(..., description="Telegram ID")
    group_id: int = Field(..., description="Group ID")

    is_headman: bool | None = Field(default=False, description="Headman status")
    is_deputy: bool | None = Field(default=False, description="Deputy status")

class DeleteUserSchema(BaseModel):
    id: int  = Field(..., description="Database ID")

class UserGetSchema(BaseModel):
    id: int = Field(..., description="Database ID")















