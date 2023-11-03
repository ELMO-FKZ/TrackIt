import { useContext, memo } from "react"
import { ProjectContext } from "../../contexts/ProjectContext"
import { ProjectMenuProps } from "../../@types/project"
import "./projectMenu.css"

const ProjectMenu = memo(function ProjectMenu({project, closeOverlay, accomplishment, showNextDelete, showNextEdit}: ProjectMenuProps) {

    const{changeProjectStatus} = useContext(ProjectContext)

    const handleDelete = () => {
        showNextDelete()
    }

    const handleEdit = () => {
        showNextEdit()
    }

    const handleInProgress = () => {
        changeProjectStatus(project.id, "In Progress")
        closeOverlay()
    }

    const handleToDo = () => {
        changeProjectStatus(project.id, "To Do")
        closeOverlay()
    }

    const handleBlock = () => {
        changeProjectStatus(project.id, "Blocked")
        closeOverlay()
    }

    const handleUnblock = () => {
        if (accomplishment === 0) {
            changeProjectStatus(project.id, "To Do")
        } else {
            changeProjectStatus(project.id, "In Progress")
        }
        closeOverlay()
    }

    return (
        <ul className="main__head-menu">
            <li className="main__project-menu-item" onClick={() => handleDelete()}>Delete</li>
            <li className="main__project-menu-item" onClick={() => handleEdit()}>Edit</li>
            {project.status =="To Do" && <li className="main__project-menu-item" onClick={() => handleInProgress()}>In Progress</li>}
            {(project.status == "In Progress" && accomplishment === 0) && <li className="main__project-menu-item" onClick={() => handleToDo()}>To Do</li>}
            {project.status =="In Progress" && <li className="main__project-menu-item" onClick={() => handleBlock()}>Block</li>}
            {project.status =="Blocked" && <li className="main__project-menu-item" onClick={() => handleUnblock()}>Unblock</li>}
        </ul>
    )
})

export default ProjectMenu