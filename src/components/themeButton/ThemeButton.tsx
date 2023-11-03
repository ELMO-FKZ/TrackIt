import useTheme from "../../hooks/useTheme"
import MoonSvg from "../moonSvg/MoonSvg"
import SunSvg from "../sunSvg/SunSvg"

function ThemeButton() {

    const [darkMode, setDarkMode] = useTheme();

    const handleThemeChange = () => {
        setDarkMode((prevDarkMode: boolean) => !prevDarkMode);
    }

    return (
        <button className="main__head-mode" onClick={handleThemeChange} aria-label="toggle dark mode">
            {!darkMode ? <MoonSvg /> : <SunSvg />}
        </button>
    )
}

export default ThemeButton;