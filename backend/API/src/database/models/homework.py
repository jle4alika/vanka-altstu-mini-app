
from sqlalchemy import ForeignKey, func, String
from sqlalchemy.orm import Mapped, mapped_column, Relationship

from backend.API.src.database.db import Base
from backend.API.src.database.models.group import Group
import datetime


class Homework(Base):
    __tablename__ = 'homeworks'

    id: Mapped[int] = mapped_column(primary_key=True)

    group_id: Mapped[str] = mapped_column(ForeignKey('groups.id'), nullable=False)

    text: Mapped[str] = mapped_column(String, nullable=False)
    files: Mapped[str] = mapped_column(String, nullable=True)

    group: Mapped['Group'] = Relationship('Group', foreign_keys=[group_id])

    created_at: Mapped[datetime.datetime] = mapped_column(default=func.now())
