import { Outlet } from "react-router-dom";

import Navbar from "../Navbar/Navbar";

import "./MainLayout.css";

export default function MainLayout() {

    return (

        <>

            <Navbar />

            <div className="main-layout">

                <Outlet />

            </div>

        </>

    );

}