from pydantic import BaseModel, Field, ConfigDict


class GroupSchema(BaseModel):
    faculty: str = Field(..., description="Faculty name")
    name: str = Field(..., description="Group name")
    headman_id: int = Field(..., description="headman ID")

    model_config = ConfigDict(extra='allow')

class GroupSchemaSetDeputy(BaseModel):
    group_id: int = Field(..., description="Group ID")
    deputy_id: int = Field(..., description="Deputy ID")

    model_config = ConfigDict(extra='allow')


class GroupSchemaSetHeadman(BaseModel):
    group_id: int = Field(..., description="Group ID")
    headman_id: int = Field(..., description="headman ID")

    model_config = ConfigDict(extra='allow')


