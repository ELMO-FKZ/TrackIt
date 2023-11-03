import { useState, useContext, memo } from "react"
import { ProjectContext } from "../../contexts/ProjectContext"
import { ProjectFormEditorProps } from "../../@types/project"

const ProjectFormEditor = memo(function ProjectFormEditor({project, closeOverlay}: ProjectFormEditorProps) {

    const [editedProject, setEditedProject] = useState({...project})
    const { editProject } = useContext(ProjectContext)

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target
        setEditedProject({ ...editedProject, [name]: value })
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        editProject(editedProject)
        closeOverlay()
    }

    return (
        <form className="modal" onSubmit={(e) => handleFormSubmit(e)}>
            <div className="modal__section">
                <label className="modal__label" htmlFor="edit-title">Title</label>
                <input className="modal__input"
                    id="edit-title" 
                    type="text" 
                    placeholder="Enter a project title" 
                    name="title" 
                    value={editedProject.title}
                    onChange={(e) => handleFormChange(e)}
                    required />
            </div>
            <div className="modal__section">
                <label className="modal__label" htmlFor="edit-start">Sart date</label>
                <input className="modal__input"
                    id="edit-start" 
                    type="date" 
                    name="startDate" 
                    value={editedProject.startDate}
                    onChange={(e) => handleFormChange(e)}
                    required />
            </div>
            <div className="modal__section">
                <label className="modal__label" htmlFor="edit-end">Due date</label>
                <input className="modal__input"
                    id="edit-end" 
                    type="date" 
                    name="endDate" 
                    value={editedProject.endDate}
                    onChange={(e) => handleFormChange(e)}
                    required />
            </div>
            <div className="modal__buttons">
                <button className="btn btn--green" type="submit">Save</button>
                <button className="btn btn--red" type="button" onClick={() => closeOverlay()}>Cancel</button>
            </div>
        </form>
    )
})

export default ProjectFormEditor