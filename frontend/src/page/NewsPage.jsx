import Navbar from "../components/Navbar/Navbar.jsx";
import News from "../components/News/News.jsx";
import Title from "../components/UI/Title/Title.jsx";



function NewsPage() {


    return (
        <>
            <Title children={"НОВОСТИ"}/>
            <News/>
            <News/>
            <News/>
            <News/>
            <div className="m-23"></div>
            <Navbar />
        </>
    )
}

export default NewsPage