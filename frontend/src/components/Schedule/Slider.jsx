import React, { useState, useRef} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Slider = ({ days, myPair, selectedDay, setSelectedDay, startIndex, setStartIndex }) => {
    const [startX, setStartX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(true);
    const directionRef = useRef(0); // 1 = вперёд, -1 = назад

    const currentDays = days.slice(startIndex, startIndex + 7);

    const handleDayClick = (day) => {
        setSelectedDay(day); // сохраняем выбранный день
    };

    const handleNext = () => {
        if (startIndex + 7 < days.length) {
            directionRef.current = 1; // ← Вперёд
            setStartIndex(prev => prev + 7);
        }
    };

    const handlePrev = () => {
        if (startIndex >= 7) {
            directionRef.current = -1; // ← Назад
            setStartIndex(prev => prev - 7);
        } else if (startIndex > 0) {
            directionRef.current = -1; // ← Назад
            setStartIndex(0);

        }
    };

    const onTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        // setIsSwiping(true);
    };

    const onTouchMove = (e) => {
        if (isSwiping) {
            const currentX = e.touches[0].clientX;
            const diff = currentX - startX;

            // Ограничиваем сдвиг, если следующей/предыдущей недели нет
            if (diff > 0 && startIndex >= 7) {
                // Свайп влево → предыдущие 7 дней
            } else if (diff < 0 && startIndex + 7 < days.length) {
                // Свайп вправо → следующие 7 дней
            }
        }
    };

    const onTouchEnd = (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0 && startIndex + 7 < days.length) {
                // Свайп вправо → следующие 7 дней
                handleNext();
            } else if (diff < 0 && startIndex >= 7) {
                // Свайп влево → предыдущие 7 дней
                handlePrev();
            }
        }

        setIsSwiping(false);
    };

    // Определяем направление анимации
    const direction = directionRef.current;
    const initialX = direction > 0 ? 150 : -150; // ← Поменяли местами
    const exitX = direction > 0 ? -150 : 150;   // ← Поменяли местами

    return (
        <div className="relative h-20 w-full overflow-hidden">
            {/* Контейнер для свайпа */}
            <div
                className="absolute top-0 left-0 flex w-full "
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <AnimatePresence initial={false} mode="popLayout">
                    <motion.div
                        key={startIndex}
                        initial={{ opacity: 0, x: initialX }} // ← Начальное состояние (в зависимости от направления)
                        animate={{ opacity: 1 , x: 0 }} // ← Конечное состояние
                        exit={{ opacity: 0, x: exitX }} // ← Выход (в зависимости от направления)
                        transition={{ duration: 0.5, ease: "easeInOut"}} // ← Длительность анимации

                        className="grid grid-cols-7 gap-1 w-full overflow-scroll"
                    >
                        {currentDays.map(day => (
                            <button
                                key={myPair[day].id}
                                onClick={() => handleDayClick(day)}
                                className={`h-fit pt-1 pb-1 pr-1.5 pl-1.5   rounded-xl w-full  ${
                                    selectedDay === day ? 'bg-(--color-my-acient) text-white' : 'bg-(--color-my-general) text-gray-200 hover:bg-gray-200'
                                }`}
                            >
                                {day}
                            </button>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Slider;