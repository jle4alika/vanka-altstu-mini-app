import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCalendarDays } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { IoBook, IoSettingsSharp } from "react-icons/io5";
import { motion } from "framer-motion";

const Navbar = () => {
    const location = useLocation(); // ← Для автоматического определения активной вкладки

    // Определим табы
    const tabs = [
        { path: '/test', icon: <GoHomeFill size={25} />, label: 'Новости' },
        { path: '/schedule', icon: <FaCalendarDays size={22} />, label: 'Расписание' },
        { path: '/homework', icon: <IoBook size={25} />, label: "Доашняя работа" },
        { path: '/profile', icon: <IoSettingsSharp size={25} />, label: 'Настойки' },
    ];

    // Состояние активной вкладки
    const [activeTab, setActiveTab] = useState(location.pathname);

    // Обработчик клика
    const handleTabClick = (path) => {
        setActiveTab(path);
    };

    return (
        <motion.div
            className="grid grid-cols-4 text-center content-center bg-(--color-my-acient) fixed bottom-0 left-0 right-0 m-2 mt-15 mb-3 h-15 rounded-2xl"
        >
            {tabs.map((tab, index) => (
                <Link
                    key={index}
                    to={tab.path}
                    onClick={() => handleTabClick(tab.path)}
                    className={`flex flex-col justify-center relative ${activeTab === tab.path ? 'text-(--color-my-acient-l)' : 'text-gray-200'}`}
                >
                    {/* Активная кнопка */}
                    {activeTab === tab.path && (
                        <motion.div>
                            <motion.div
                                className="absolute inset-0 bg-(--color-my-acient) text-(--color-my-primary) rounded-full flex items-center justify-center w-13 h-13 m-auto "

                                initial={{ y:0, opacity: 0 }}
                                animate={{ y:-20, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {tab.icon}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y:0 }}
                                animate={{ opacity: 1, y:10 }}
                                exit={{ opacity: 0,  }}
                                transition={{ duration: 0.3 }}
                                className="text-(--color-my-primary) text-xs font-medium"
                            >
                                {tab.label}
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Неактивная иконка */}
                    {activeTab !== tab.path &&  (
                        <motion.div
                            className="m-auto text-(--color-my-acient-r)"
                        >
                            {tab.icon}
                        </motion.div>
                    )}
                </Link>
            ))}
        </motion.div>
    );
};

export default Navbar;