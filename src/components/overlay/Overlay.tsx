import { memo } from "react"
import { OverlayProps } from "../../@types/project"
import "./overlay.css"

const Overlay = memo(function Overlay({closeOverlay, children}: OverlayProps) {

    return (
        <div className="main__overlay" onClick={(e) => {
            if (e.target === e.currentTarget) {
                closeOverlay()
            }
        }}>
            {children}
        </div>
    )
})

export default Overlay;
