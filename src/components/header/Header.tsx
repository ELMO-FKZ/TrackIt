import ThemeButton from "../themeButton/ThemeButton"
import "./header.css"

function Header() {
    
    return (
        <div className="main__head">
            <h1 className="text-hover">TrackIt</h1>
            <ThemeButton />
        </div>
    )
}

export default Header