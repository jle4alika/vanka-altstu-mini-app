import datetime

from pydantic import BaseModel, Field

class ScheduleSchema(BaseModel):
    id: int = Field(default=None)

    group_id: int = Field(description='Database Group id')
    lessons: str = Field(description='Teacher Audience and time')

    day: datetime.datetime = Field(description='Day and month of schedule')
















