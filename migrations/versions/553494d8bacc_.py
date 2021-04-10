"""empty message

Revision ID: 553494d8bacc
Revises: 
Create Date: 2021-04-07 04:50:33.932952

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '553494d8bacc'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('nickname', sa.String(length=64), nullable=False),
    sa.Column('email', sa.String(length=64), nullable=True),
    sa.Column('name', sa.String(length=32), nullable=False),
    sa.Column('pw', sa.String(length=64), nullable=False),
    sa.Column('date', sa.DATE(), nullable=False),
    sa.Column('usertype', sa.String(length=32), nullable=True),
    sa.PrimaryKeyConstraint('id', 'nickname'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('nickname'),
    mysql_collate='utf8_general_ci'
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    # ### end Alembic commands ###
