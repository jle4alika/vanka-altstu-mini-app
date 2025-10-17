import React, { useState } from 'react';
import SettingsModal from "./SettingsModal.jsx";

const Settings = () => {

    const [modal, setModal] = useState(false);

    return (
        <div>
            <div className="mx-3 mt-5">
                <button
                onClick={() => setModal(true)}
                className="w-full h-fit p-3 my-2 text-center bg-(--color-my-general) rounded-2xl "
                >
                    Добавить домашнее задание
                </button>
                <button

                className="w-full h-fit p-3 my-2 text-center bg-(--color-my-general) rounded-2xl "
                >
                    Связь с нами
                </button>
                <button

                className="w-full h-fit p-3 my-2 text-center bg-(--color-my-general) rounded-2xl "
                >
                    Оценить
                </button>

            </div>

            <SettingsModal visible={modal} setVisible={setModal} />
        </div>
    );

};

export default Settings;