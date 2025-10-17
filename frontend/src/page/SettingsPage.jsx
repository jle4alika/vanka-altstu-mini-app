import React from 'react';
import Settings from "../components/Settings/Settings.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import Title from "../components/UI/Title/Title.jsx";

const SettingsPage = () => {
    return (
        <div>
            <Title children={"НАСТРОЙКИ"}/>
            <Settings />
            <Navbar />
        </div>
    );
};

export default SettingsPage;