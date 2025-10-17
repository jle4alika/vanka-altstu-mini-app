import asyncio

from aiogram import F, Router
from aiogram.types import Message, CallbackQuery, FSInputFile
from aiogram.filters import Command

import database.requests.get as get
import keyboards.inline_keyboard as kb
import keyboards.reply_keyboard as kbr
from aiogram.fsm.context import FSMContext


router = Router()


@router.message(Command('admin_ириска25cchaem'))
async def admin(message: Message, state: FSMContext):
    await state.clear()

    state = await get.user_state(message.from_user.id)

    if state == 'admin':
        await message.answer('Вы успешно вошли в админ панель',
                             reply_markup=kb.admin)


@router.callback_query(F.data == 'get_logs')
async def get_logs(callback: CallbackQuery):
    await callback.message.answer_document(FSInputFile('logs.txt'))


