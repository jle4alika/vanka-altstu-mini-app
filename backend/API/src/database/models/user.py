from sqlalchemy import Integer, BigInteger, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, Relationship

from backend.API.src.database.db import Base
from backend.API.src.database.models.group import Group
import datetime


class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True)

    tg_id: Mapped[int] = mapped_column(BigInteger, unique=True, nullable=False)

    group_id: Mapped[int] = mapped_column(ForeignKey('groups.id'), nullable=True)

    headman: Mapped[bool] = mapped_column(default=False)
    deputy: Mapped[bool] = mapped_column(default=False)

    last_activity: Mapped[datetime.datetime] = mapped_column(default=func.now())

    created_at: Mapped[datetime.datetime] = mapped_column(default=func.now())
    group: Mapped['Group'] = Relationship('Group', foreign_keys=[group_id])
