import { useContext } from "react"
import { ProjectContext } from "../../contexts/ProjectContext"
import { ProjectType } from "../../@types/project"
import Project from "../project/Project"
import "./projectViewer.css"

function ProjectViewer() {

    const { projects } = useContext(ProjectContext)

    return (
        <div className="main__list-projects">
            { 
                projects.length !== 0 
                ?
                projects.map((project: ProjectType) => {
                    return (
                        <Project key={project.id} project={project} />
                    )
                }) 
                :
                <div className="main__nodata">
                    <div className="main__nodata-title">Start tracking your projects!</div>
                    <span>Click the + button to add your first project</span>
                </div>
            }
        </div>
    )
}

export default ProjectViewer