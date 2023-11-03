import { useState } from "react"
import {FaPlus} from "react-icons/fa"
import Overlay from "../overlay/Overlay"
import ProjectFormAdder from "../projectFormAdder/ProjectFormAdder"
import "./projectAdder.css"

function ProjectAdder() {

    const [showOverlay, setShowOverlay] = useState(false)

    const openOverlay = () => {
        setShowOverlay(true)
    };
    
    const closeOverlay = () => {
        setShowOverlay(false)
    };
    
    return (
        <div className="main__list-add">
            <button className="main__add-btn background-hover" onClick={() => openOverlay()} aria-label="Add a project" >
                <FaPlus />
            </button>
            {
                showOverlay &&
                <Overlay closeOverlay={closeOverlay}>
                    <ProjectFormAdder closeOverlay={closeOverlay} />
                </Overlay>
            }
        </div>
    )
}

export default ProjectAdder