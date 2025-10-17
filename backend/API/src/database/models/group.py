
from sqlalchemy import ForeignKey, Integer, func, String
from sqlalchemy.orm import Mapped, mapped_column, Relationship

from backend.API.src.database.db import Base
import datetime


class Group(Base):
    __tablename__ = 'groups'

    id: Mapped[int] = mapped_column(primary_key=True)

    faculty: Mapped[str] = mapped_column(String, nullable=False)
    group_name: Mapped[str] = mapped_column(String, nullable=False)
    members_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    headman_id: Mapped[int] = mapped_column(ForeignKey('users.id'))
    headman: Mapped['User'] = Relationship('User', foreign_keys=[headman_id])

    deputy_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=True)
    deputy: Mapped['User'] = Relationship('User', foreign_keys=[deputy_id])

    created_at: Mapped[datetime.datetime] = mapped_column(default=func.now())
