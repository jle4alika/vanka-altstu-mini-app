import React, { useState, useEffect } from 'react';
import myPair from '../../APi/api.js';
import Slider from './Slider';
import Lessons from './Lessons';

const PairList = () => {
    const days = Object.keys(myPair); // все дни
    const [startIndex, setStartIndex] = useState(0);
    const [selectedDay, setSelectedDay] = useState(null); // выбранный день

    const getTodayDate = () => {
        const now = new Date();
        const day = now.getDate();
        const monthNames = [
            'янв', 'фев', 'мар', 'апр', 'мая', 'июн',
            'июл', 'авг', 'сен', 'окт', 'ноб', 'дек'
        ];
        const month = monthNames[now.getMonth()];
        return `${day} ${month}`;
    };

    // Автоматически выбираем сегодняшний день при загрузке
    useEffect(() => {
        const today = getTodayDate();

        // Проверяем, есть ли день с точным совпадением
        const found = days.find(day => day === today);

        if (found) {
            setSelectedDay(found);
            const dayIndex = days.indexOf(found);
            const weekStartIndex = Math.floor(dayIndex / 7) * 7;
            setStartIndex(weekStartIndex);
        }
    }, []);

    return (
        <div className=" max-w-full overflow-hidden">
            <div className="p-4">

                <Slider
                    days={days}
                    myPair={myPair}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    startIndex={startIndex}
                    setStartIndex={setStartIndex}
                />
            </div>

            {selectedDay ? (
                <Lessons selectedDay={selectedDay} myPair={myPair} />
            ) : (
                <p>Выберите день</p>
            )}
        </div>
    );
};

export default PairList;