"""user update google

Revision ID: dae74457526b
Revises: 1403da776fe1
Create Date: 2020-01-14 14:27:36.429477

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dae74457526b'
down_revision = '1403da776fe1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('google_id', sa.String(length=128), nullable=True))
    op.add_column('user', sa.Column('google_image', sa.String(length=256), nullable=True))
    op.create_index(op.f('ix_user_google_id'), 'user', ['google_id'], unique=True)
    op.drop_column('user', 'password')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('password', sa.VARCHAR(length=256), autoincrement=False, nullable=True))
    op.drop_index(op.f('ix_user_google_id'), table_name='user')
    op.drop_column('user', 'google_image')
    op.drop_column('user', 'google_id')
    # ### end Alembic commands ###
