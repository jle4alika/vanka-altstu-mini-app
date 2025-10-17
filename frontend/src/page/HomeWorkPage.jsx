import Navbar from "../components/Navbar/Navbar.jsx";
import HomeWork from "../components/Homework/HomeWork.jsx";
import Title from "../components/UI/Title/Title.jsx";

const HomeWorkPage = () => {
    return (
        <>
            <Title children={"ДОМАШНЯЯ РАБОТА"}/>
            <HomeWork/>
            <Navbar/>
        </>
    );
};

export default HomeWorkPage;