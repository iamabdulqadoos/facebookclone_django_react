import { useTheme } from "../../context/ThemeContext";
import "./ThemeToggle.css";


export default function ThemeToggle() {


    const {
        darkMode,
        toggleTheme
    } = useTheme();



    return (

        <button
            className="theme-toggle"
            onClick={toggleTheme}
        >

            {
                darkMode
                ? "☀️ Light Mode"
                : "🌙 Dark Mode"
            }

        </button>

    );

}