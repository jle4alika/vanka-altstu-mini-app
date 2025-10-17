from aiogram import F, Router
from aiogram.types import Message, CallbackQuery
import database.requests.get as get
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup


router = Router()


class Admin(StatesGroup):
    notify = State()


@router.callback_query(F.data == 'notify')
async def notify(callback: CallbackQuery, state: FSMContext):
    await callback.message.answer('Отправьте текст для уведомления пользователям')
    await state.set_state(Admin.notify)


@router.message(Admin.notify)
async def notify(message: Message, state: FSMContext):
    if message.text.lower() == 'назад':
        await message.answer('Отменено.')
        await state.clear()
        return
    await state.update_data(notify=message.text)

    users = await get.users_user_id()
    for user in users:
        await message.copy_to(chat_id=user)

    await message.answer('Вы успешно отправили уведомление пользователям!')
    await state.clear()