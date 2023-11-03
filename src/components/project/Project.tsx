import { useState, memo } from "react"
import { projectColor } from "../../utils/projectColor"
import { ProjectProps } from "../../@types/project"
import ProjectUpperPart from "../projectUpperPart/ProjectUpperPart"
import ProjectLowerPart from "../projectLowerPart/ProjectLowerPart"
import "./project.css"

const Project = memo(function Project({project}: ProjectProps) {

    const [extend, setExtend] = useState(false)
    
    const handleExtend = () => {
        setExtend(prev => !prev)
    }

    return (
        <div className={`main__list-project main__list-project--${projectColor(project.status)}`}>
            <ProjectUpperPart extend={extend} handleExtend={handleExtend} project={project} />
            {extend && <ProjectLowerPart project={project} />}
        </div>
    )
})

export default Project