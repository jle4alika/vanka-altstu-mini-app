import asyncio

from aiogram import F, Router, Bot
from aiogram.types import Message, CallbackQuery
from aiogram.enums import ParseMode
from aiogram.filters import Command
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, KeyboardButton
from aiogram.utils.keyboard import InlineKeyboardBuilder, ReplyKeyboardBuilder
import database.requests.get as get
import database.requests.add as add
import database.requests.set as set
import keyboards.inline_keyboard as kb
import keyboards.reply_keyboard as kbr
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import FSInputFile

from pyrogram import Client
from pyrogram.raw.functions.contacts import ResolveUsername


import os
import datetime
import re
import json
from dotenv import find_dotenv, load_dotenv
# from apscheduler.schedulers.asyncio import AsyncIOScheduler
from datetime import timedelta

load_dotenv(find_dotenv())

router = Router()

class Admin(StatesGroup):
    new_admin = State()
    
async def resolve_username_to_user_id(username: str) -> int | None:
    async with Client(
                "michael",
                api_id=25172187,
                api_hash="c163275c64658d29c719f13786a92cbb",
                bot_token=os.getenv('TOKEN'),
                in_memory=False) as ubot:
        try:
            user = await ubot.get_users(username)
            return user.id
        except Exception as err:
            print(err)


@router.callback_query(F.data == 'set_admin')
async def set_admin(callback: CallbackQuery, state: FSMContext):
    await callback.message.answer('Введите @юз нового админа')
    await state.set_state(Admin.new_admin)


@router.message(Admin.new_admin)
async def set_admin(message: Message, state: FSMContext, bot: Bot):
    if message.text.lower() == 'назад':
        await message.answer('Отменено.')
        await state.clear()
    else:
        mention = re.search(r'@(\w+)', message.text)
        if mention:
            username = mention.group(1)

            new_admin_id = await resolve_username_to_user_id(username)
            if new_admin_id != message.from_user.id:
                if await get.user_bool(new_admin_id):
                    await add.user_state_admin(new_admin_id)
                    await message.answer(f'Вы успешно назначили админа @{username}')
                    await bot.send_message(chat_id=new_admin_id, text='<b>Вас назначили администратором!</b>',
                                           parse_mode=ParseMode.HTML,
                                           reply_markup=kbr.main)
                else:
                    await message.answer('Пользователь не зарегистрирован в боте')
            else:
                await message.answer('Вы не можете назначить себя на пост администратора.')
        await state.clear()
