import { useContext, useState } from "react"
import { ProjectContext } from "../../contexts/ProjectContext"
import { ProjectType } from "../../@types/project"
import Overlay from "../overlay/Overlay"
import ConfirmModal from "../confirmModal/ConfirmModal"
import InformModal from "../informModal/InformModal"
import "./projectClearer.css"

function ProjectClearer() {

    const [showOverlay, setShowOverlay] = useState(false)
    const [thereIsCompleted, setThereIsCompleted] = useState("")
    const { projects, clearCompleted } = useContext(ProjectContext)

    const openOverlay = () => {
        setShowOverlay(true);
        const completedProject = projects.find((project: ProjectType) => project.status == "Completed") 
        if(completedProject) {
            setThereIsCompleted("true")
        } else {
            setThereIsCompleted("false")
        }
    }
    
    const closeOverlay = () => {
        setShowOverlay(false);
        setThereIsCompleted("")
    }

    const handleConfirm = () => {
        clearCompleted()
        closeOverlay()
    }

    return (
        <div className="main__list-clear">
            <button className="main__clear text-hover" onClick={() => openOverlay()} >
                Clear completed
            </button>
            {
                showOverlay &&
                <Overlay closeOverlay={closeOverlay}>
                    {thereIsCompleted === "true" && <ConfirmModal title="Are You Sure?" message="The completed projects will be deleted permanently!" closeOverlay={closeOverlay} handleConfirm={handleConfirm} />}
                    {thereIsCompleted === "false" && <InformModal title="Ooops!" message="There is no completed projects to delete!" closeOverlay={closeOverlay} />}
                </Overlay>
            }
        </div>
    )
}

export default ProjectClearer