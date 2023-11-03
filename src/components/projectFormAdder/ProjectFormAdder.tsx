import { useState, useContext, memo } from "react"
import { ProjectContext } from "../../contexts/ProjectContext"
import { initProject } from "../../utils/initProject"
import { v4 as uuidv4 } from "uuid"
import { FaPlus, FaTimes } from "react-icons/fa"
import { ProjectFormAdderProps } from "../../@types/project"
import "./projectFormAdder.css"

const ProjectFormAdder = memo(function ProjectFormAdder({closeOverlay}: ProjectFormAdderProps) {

    const [newProject, setNewProject] = useState(initProject())
    const { addProject } = useContext(ProjectContext)

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value, id } = e.target
        if (name === "text") {
            const editedTasks = newProject.tasks.map(task => {
                if (task.id === id) {
                    return {...task, [name]: value }
                }
                return task
            }) 
            setNewProject({ ...newProject, tasks: editedTasks })
        } else {
            setNewProject({ ...newProject, [name]: value })
        }
    }

    const handleAddMore = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const taskId = uuidv4()
        const newTask = { id: taskId, text: "", completed: false }
        const tasks = [...newProject.tasks, newTask]
        setNewProject({ ...newProject, tasks: tasks })
    }

    const deleteTask = (taskId: string) => {
        const updatedTasks = newProject.tasks.filter(task => task.id !== taskId)
        setNewProject({...newProject, tasks: updatedTasks})
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addProject(newProject)
        setNewProject(initProject)
        closeOverlay()
    }

    return (
        <form className="modal" onSubmit={(e) => handleFormSubmit(e)}>
            <div className="modal__section">
                <label className="modal__label" htmlFor="add-title">Title</label>
                <input className="modal__input"
                    id="add-title" 
                    type="text" 
                    placeholder="Enter a project title" 
                    name="title" 
                    value={newProject.title}
                    onChange={(e) => handleFormChange(e)}
                    required />
            </div>
            <div className="modal__section">
                <label className="modal__label" htmlFor="add-start">Sart date</label>
                <input className="modal__input"
                    id="add-start" 
                    type="date" 
                    name="startDate" 
                    value={newProject.startDate}
                    onChange={(e) => handleFormChange(e)}
                    required />
            </div>
            <div className="modal__section">
                <label className="modal__label" htmlFor="add-end">Due date</label>
                <input className="modal__input"
                    id="add-end" 
                    type="date" 
                    name="endDate" 
                    value={newProject.endDate}
                    onChange={(e) => handleFormChange(e)}
                    required />
            </div>
            <div className="modal__section">
                <div className="modal__label">Tasks</div>
                <div className="modal__tasks">
                {newProject.tasks.map((task) => {
                    return (
                        <div key={task.id} className="modal__task">
                            <input className="modal__input"
                            id={task.id}
                            placeholder="Enter a task"
                            type="text"
                            name="text"
                            value={task.text}
                            onChange={(e) => handleFormChange(e)}
                            required />
                            <button className="modal__delete-task" type="button" name="delete-task" onClick={() => deleteTask(task.id)} aria-label="delete task">
                                <FaTimes />
                            </button>
                        </div>
                    )
                })}
                </div>
                <button className="modal__more" type="button" name="add-task" onClick={(e) => handleAddMore(e)}><FaPlus />Add more tasks</button>
            </div>
            <div className="modal__buttons">
                <button className="btn btn--green" type="submit">Save</button>
                <button className="btn btn--red" type="button" onClick={() => closeOverlay()}>Cancel</button>
            </div>
        </form>
    )
})

export default ProjectFormAdder