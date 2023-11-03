import { useEffect, useState } from "react"
import { getMode } from "../utils/localStorage"
import { setMode } from "../utils/localStorage"

function useTheme(): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {

    const [darkMode, setDarkMode] = useState(getMode("dark-mode") || false)

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("body--dark")
        } else {
            document.body.classList.remove("body--dark")
        }
        setMode("dark-mode", darkMode)
    }, [darkMode])

    return [darkMode, setDarkMode]
}

export default useTheme