import Navbar from "../components/Navbar/Navbar.jsx";
import Schedule from "../components/Schedule/Schedule.jsx";
import Title from "../components/UI/Title/Title.jsx";


const SchedulePage = () => {

    return (
        <div>
            <Title children={"РАСПИСАНИЕ"}/>
            <Schedule/>
            <div className="m-20"></div>
            <Navbar />
        </div>
    );
};

export default SchedulePage;