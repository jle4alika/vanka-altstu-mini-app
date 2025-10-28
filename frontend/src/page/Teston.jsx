import React, { useEffect, useState } from 'react';
import { init } from '@tma.js/sdk';

const Teston = () => {
  // Теперь состояние хранит только ID пользователя
  const [userId, setUserId] = useState(null);
  const [initDataRaw, setInitDataRaw] = useState(null);
  const [startParam, setStartParam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sdkError, setSdkError] = useState(null);
  const [rawWindowData, setRawWindowData] = useState(null);

  useEffect(() => {
    const initializeTMA = async () => {
      let userIdFromWindowFallback = null; // Переменная для резервного ID

      try {
        console.log('Попытка инициализации TMA SDK с валидацией...');

        // ИНИЦИАЛИЗАЦИЯ SDK С БОТОКЕНОМ ДЛЯ ВАЛИДАЦИИ initData
        // ВАЖНО: botToken НЕ ДОЛЖЕН находиться в клиентском коде на продакшене!
        const BOT_TOKEN_FOR_DEMO = '8375541787:AAF6YSpvXjwRqvLitE9h66TIEcvOrTAbb7w'; // <- ЗАМЕНИТЕ НА СВОЙ ТОКЕН ДЛЯ ТЕСТА

        // Выполняем ИНИЦИАЛИЗАЦИЮ ОДИН РАЗ с botToken
        const { initData, ...other } = await init({
          botToken: BOT_TOKEN_FOR_DEMO,
        });

        console.log('SDK инициализирован (с botToken), initData объект:', initData);
        console.log('Полный объект SDK (для отладки):', { initData, ...other });

        // Извлекаем данные через SDK после инициализации с botToken
        const initDataRawFromSDK = initData?.authData || null; // authData может быть не всегда
        const startParamFromSDK = initData?.startParam || null;
        // Извлекаем ТОЛЬКО ID пользователя из SDK
        const userIdFromSDK = initData?.user?.id || null;

        console.log('Init Data Raw (authData из SDK):', initDataRawFromSDK);
        console.log('Start Param (из SDK):', startParamFromSDK);
        console.log('User ID (из SDK):', userIdFromSDK);

        // Получаем "сырые" данные из window для отладки И резервного копирования
        const windowInitData = window?.Telegram?.WebApp?.initData;
        const windowInitDataUnsafe = window?.Telegram?.WebApp?.initDataUnsafe;
        setRawWindowData({
          initData: windowInitData,
          initDataUnsafe: windowInitDataUnsafe
        });
        console.log('Данные из window.Telegram.WebApp.initData (raw):', windowInitData);
        console.log('Данные из window.Telegram.WebApp.initDataUnsafe (parsed):', windowInitDataUnsafe);

        // Устанавливаем данные из SDK
        setInitDataRaw(initDataRawFromSDK);
        setStartParam(startParamFromSDK);

        if (userIdFromSDK) {
          console.log('ID пользователя найден через SDK:', userIdFromSDK);
          // setUser(userFromSDK); // Больше не используем setUser для полного объекта
        } else {
          console.warn('ID пользователя отсутствует в SDK initData.');
          // Резервное извлечение ТОЛЬКО ID из window, если SDK не вернул
          if (windowInitDataUnsafe && windowInitDataUnsafe.user && windowInitDataUnsafe.user.id) {
             userIdFromWindowFallback = windowInitDataUnsafe.user.id; // Сохраняем ТОЛЬКО ID в переменную
             console.log('ID пользователя найден в window.Telegram.WebApp.initDataUnsafe, готов к использованию как fallback. ID:', userIdFromWindowFallback);
          } else {
             console.warn('ID пользователя не найден ни в SDK, ни в window.');
          }
        }

      } catch (err) {
        console.error('Ошибка инициализации TMA SDK:', err);
        setSdkError(`Ошибка SDK: ${err.message || err}`);
      } finally {
        // ПОСЛЕ завершения инициализации, если setUserId не был вызван SDK, используем fallback
        if (!userId && userIdFromWindowFallback !== null) { // Проверяем !== null, т.к. 0 - валидный ID
          console.log('Устанавливаем ID пользователя из резервного источника (window). ID:', userIdFromWindowFallback);
          setUserId(userIdFromWindowFallback);
        } else if (userIdFromSDK) { // Если SDK нашел ID, устанавливаем его
          console.log('Устанавливаем ID пользователя из SDK. ID:', userIdFromSDK);
          setUserId(userIdFromSDK);
        } else {
          // Если ни SDK, ни резервный метод не нашли ID
          console.log('ID пользователя не найден ни в SDK, ни в резервном источнике.');
          // setUserId(null); // setUser уже null по умолчанию, можно не вызывать
        }

        setLoading(false);
      }
    };

    if (!window.Telegram?.WebApp) {
      console.warn('window.Telegram.WebApp не найден. Приложение запущено не из Telegram?');
      setError('window.Telegram.WebApp не найден. Приложение должно быть запущено из Telegram.');
      setLoading(false);
      return;
    }

    initializeTMA();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Загрузка...</h2>
        <p>Проверка подключения к Telegram WebApp и инициализация SDK...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Дебаг: Telegram Mini App (TMA.js - Только ID)</h1>

      {/* Основные ошибки */}
      {error && (
        <div style={{ backgroundColor: '#ffcccc', padding: '10px', marginBottom: '10px', border: '1px solid #ff0000' }}>
          <strong>Ошибка приложения:</strong> {error}
        </div>
      )}

      {sdkError && (
        <div style={{ backgroundColor: '#ffcccc', padding: '10px', marginBottom: '10px', border: '1px solid #ff0000' }}>
          <strong>Ошибка SDK:</strong> {sdkError}
        </div>
      )}

      {/* Информация о пользователе (только ID) */}
      {userId !== null ? ( // Проверяем !== null
        <div style={{ backgroundColor: '#ccffcc', padding: '10px', marginBottom: '10px', border: '1px solid #00ff00' }}>
          <h2>✅ ID пользователя определён</h2>
          <p><strong>ID:</strong> {userId}</p>
        </div>
      ) : (
        <div style={{ backgroundColor: '#fff3cd', padding: '10px', marginBottom: '10px', border: '1px solid #ffeaa7' }}>
          <h2>⚠️ ID пользователя не определён</h2>
          <p>Telegram не передал ID пользователя. SDK не смог извлечь, и резервное копирование из window не сработало.</p>
        </div>
      )}

      {/* Информация из SDK */}
      <details style={{ marginBottom: '10px' }}>
        <summary><strong>Данные из SDK:</strong></summary>
        <pre>{JSON.stringify({ initDataRaw, startParam }, null, 2)}</pre>
      </details>

      {/* Сырые данные из window */}
      <details style={{ marginBottom: '10px' }}>
        <summary><strong>Сырые данные из window.Telegram.WebApp:</strong></summary>
        <pre>{JSON.stringify(rawWindowData, null, 2)}</pre>
      </details>

      {/* Состояния */}
      <div style={{ fontSize: '0.9em', color: '#666' }}>
        <p><strong>user ID (используемый):</strong> {userId !== null ? userId : 'не найден'}</p>
        <p><strong>initDataRaw (из SDK):</strong> {initDataRaw ? 'получен' : 'не получен'}</p>
        <p><strong>startParam (из SDK):</strong> {startParam || 'не передан'}</p>
        <p><strong>error:</strong> {error || 'нет'}</p>
        <p><strong>sdkError:</strong> {sdkError || 'нет'}</p>
      </div>
    </div>
  );
};

export default Teston;