import datetime

from pydantic import BaseModel, Field

class HomeworkSchema(BaseModel):
    group_id: int = Field(description='Database Group ID')
    text: str = Field(description='Homework text')

    created_at: datetime.datetime = Field(description='Homework created time')


class HomeworkCreateSchema(BaseModel):
    group_id: int = Field(description='Database Group ID')
    text: str = Field(description='Homework text')


class HomeworkDeleteSchema(BaseModel):
    id: int = Field(description='Database Homework ID')


class HomeworkGet(HomeworkSchema):
    id: int = Field(description='Database Homework ID')
















