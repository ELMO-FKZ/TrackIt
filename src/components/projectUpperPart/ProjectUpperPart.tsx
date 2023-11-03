import { useState, useContext, memo } from "react"
import { FaEllipsisV, FaChevronDown, FaChevronRight, FaRegClock } from "react-icons/fa"
import { ProjectContext } from "../../contexts/ProjectContext"
import { ProjectUpperPartProps } from "../../@types/project"
import Overlay from "../overlay/Overlay"
import ProjectMenu from "../projectMenu/ProjectMenu"
import ConfirmModal from "../confirmModal/ConfirmModal"
import ProjectFormEditor from "../projectFormEditor/ProjectFormEditor"
import useDaysLeft from "../../hooks/useDaysLeft"
import useStatusChanger from "../../hooks/useStatusChanger"
import "./projectUpperPart.css"

const ProjectUpperPart = memo(function ProjectUpperPart({extend, handleExtend, project}: ProjectUpperPartProps) {

    const [showOverlay, setShowOverlay] = useState(false)
    const [toBeDeleted, setToBeDeleted] = useState(false)
    const [toBeEdited, setToBeEdited] = useState(false)
    const {deleteProject} = useContext(ProjectContext)

    const [daysLeft] = useDaysLeft(project.endDate)
    const totalTasks = project.tasks.length
    const completedTasks = project.tasks.filter(task => task.completed).length
    const accomplishment = (completedTasks * 100)/totalTasks

    useStatusChanger(accomplishment, project.id)
    
    const openOverlay = () => {
        setShowOverlay(true)
    }
    
    const closeOverlay = () => {
        setToBeDeleted(false)
        setToBeEdited(false)
        setShowOverlay(false)
    }
    
    
    const showNextDelete = () => {
        setToBeDeleted(true)
    }

    const showNextEdit = () => {
        setToBeEdited(true)
    }
    
    const handleConfirm = () => {
        closeOverlay()
        deleteProject(project.id)
    }
    
    return (
        <>
        <div className="main__project-head" >
            <div className="main__head-left" onClick={() => handleExtend()}>
                <div className="main__head-title" >
                    {extend ? <FaChevronDown /> : <FaChevronRight /> }
                    {project.title}   
                </div>
                <div className="main__head-indicator">
                    <div className="main__head-progress">
                        <span>{completedTasks}/{totalTasks} Completed</span>
                        {daysLeft !== null &&<span>{daysLeft} days left</span>}
                    </div>
                    <div className="main__progress-outer">
                        <div className="main__progress-inner" style={{width: `${accomplishment}%`}}></div>
                    </div>
                </div>
                <div className="main__head-dates">
                    <FaRegClock />
                    <span>{project.startDate} / {project.endDate}</span>
                </div>
            </div>
            <FaEllipsisV style={{cursor: "pointer", flexShrink: 0}} onClick={() => openOverlay()} />
            {
                showOverlay && (
                    <>
                        {(!toBeDeleted && !toBeEdited) && <ProjectMenu project={project} closeOverlay={closeOverlay} accomplishment ={accomplishment} showNextDelete={showNextDelete} showNextEdit={showNextEdit} />}
                        <Overlay closeOverlay={closeOverlay} >
                            {toBeDeleted && <ConfirmModal title="Are You Sure?" message="The project will be deleted permanently!" closeOverlay={closeOverlay} handleConfirm={handleConfirm} />}
                            {toBeEdited && <ProjectFormEditor project={project} closeOverlay={closeOverlay} />}
                        </Overlay>
                    </>
                )
            }
        </div>
        </>
    )
})

export default ProjectUpperPart