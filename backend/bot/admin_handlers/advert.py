import asyncio

from aiogram import F, Router, Bot
from aiogram.types import Message, CallbackQuery
from aiogram.enums import ParseMode
import database.requests.get as get
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup

import datetime


router = Router()


class Admin(StatesGroup):
    advert_time = State()
    advert_date = State()
    advert = State()
    
    
async def create_task(message: Message, time: int, date: datetime, bot: Bot):
    now = datetime.datetime.now()
    seconds = (date - now).total_seconds()
    await asyncio.sleep(seconds)

    messages_id = {}
    users = await get.users_user_id()
    for user in users:
        msg = await message.copy_to(chat_id=user)
        messages_id[user] = msg.message_id

    await message.answer('<b>Ваша реклама была успешно отправлена</b>'
                         f'\n\n Ваша реклама будет удалена через: <b>{time / 60} минут</b>',
                         parse_mode=ParseMode.HTML)

    await asyncio.sleep(time)

    for user in messages_id:
        await bot.delete_message(chat_id=user, message_id=messages_id[user])

    await message.answer(f'<b>Ваш пост с рекламой на <code>{date}</code> был успешно удалён!</b>',
                         parse_mode=ParseMode.HTML)


@router.callback_query(F.data == 'upload_advertisement')
async def set_google(callback: CallbackQuery, state: FSMContext):
    await callback.message.answer(
        'Напишите через сколько удалить пост <ins><b>в минутах</b></ins>',
        parse_mode=ParseMode.HTML)
    await state.set_state(Admin.advert_time)


@router.message(Admin.advert_time)
async def admin_advert_photo(message: Message, state: FSMContext, bot: Bot):
    if message.text.lower() == 'назад':
        await message.answer('Отменено.')
        await state.clear()
    else:
        await state.update_data(advert_time=int(message.text))
        await message.answer('Отправьте дату отправки поста в формате \n<b>%Y-%m-%d %H:%M</b> год-месяц-день час:минуты\n\n<b><i> В МСК часовом поясе (UTC/GMT +3)</i></b>',
                             parse_mode=ParseMode.HTML)
        await state.set_state(Admin.advert_date)


@router.message(Admin.advert_date)
async def admin_advert_photo(message: Message, state: FSMContext, bot: Bot):
    if message.text.lower() == 'назад':
        await message.answer('Отменено.')
        await state.clear()
    else:
        try:
            date = datetime.datetime.strptime(message.text, '%Y-%m-%d %H:%M')
            await state.update_data(advert_date=date)
            await message.answer('Отправьте пост для рассылки всем пользователям')
            await state.set_state(Admin.advert)
        except ValueError:
            await message.answer('Неверный формат даты'
                                 '\nОтправьте дату отправки поста в формате \n<b>%Y-%m-%d %H:%M</b> год-месяц-день час:минуты'
                                 '\n\n<b><i> В часовом поясе МСК (UTC/GMT +3)</i></b>',
                                 parse_mode=ParseMode.HTML)


@router.message(Admin.advert)
async def admin_advert_photo(message: Message, state: FSMContext, bot: Bot):
    data = await state.get_data()
    time = data['advert_time'] * 60
    date = data['advert_date']
    await message.answer(f'Ваша реклама будет отправлена в <code>{date}</code>, а после удалена через {time / 60} минут',
                         parse_mode=ParseMode.HTML)
    await create_task(message, time, date, bot)
    await state.clear()

    
    
    
    
