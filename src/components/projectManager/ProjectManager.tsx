import ProjectAdder from "../projectAdder/ProjectAdder"
import ProjectViewer from "../projectViewer/ProjectViewer"
import ProjectClearer from "../projectClearer/ProjectClearer"
import "./projectManager.css"

function ProjectManager() {

    return (
        <div className="main__list">
            <ProjectAdder />
            <ProjectViewer />
            <ProjectClearer />
        </div>
    )
}

export default ProjectManager