import Sidebar from "../../components/Sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";

import "./Home.css";

export default function Home() {

    return (

        <div className="home">

            <Sidebar />

            <Feed />

            <Rightbar />

        </div>

    );

}