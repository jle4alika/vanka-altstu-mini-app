import datetime

from sqlalchemy import ForeignKey, String, DATETIME, func
from sqlalchemy.orm import Mapped, mapped_column, Relationship

from backend.API.src.database.db import Base
from backend.API.src.database.models.group import Group


class Schedule(Base):
    __tablename__ = 'schedules'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    group_id: Mapped[int] = mapped_column(ForeignKey('groups.id'), nullable=False)

    lessons: Mapped[str] = mapped_column(String, nullable=False)
    day: Mapped[datetime.datetime] = mapped_column(DATETIME, default='', nullable=False)

    group: Mapped['Group'] = Relationship('Group', foreign_keys=[group_id])
