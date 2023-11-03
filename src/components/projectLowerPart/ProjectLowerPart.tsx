import { useState, useContext, memo } from "react"
import { FaRegEdit, FaRegTrashAlt, FaCaretRight, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa"
import { projectColor } from "../../utils/projectColor"
import { ProjectContext } from "../../contexts/ProjectContext"
import { ProjectLowerPartProps } from "../../@types/project"
import { TaskType } from "../../@types/project"
import Overlay from "../overlay/Overlay"
import ConfirmModal from "../confirmModal/ConfirmModal"
import TaskAdder from "../taskAdder/TaskAdder"
import "./projectLowerPart.css"

const ProjectLowerPart = memo(function ProjectLowerPart({project}: ProjectLowerPartProps) {

    const [toBeEdited, setToBeEdited] = useState(false)
    const [showOverlay, setShowOverlay] = useState(false)
    const [editedTask, setEditedTask] = useState<TaskType>({} as TaskType)
    const [deletedTask, setDeletedTask] = useState<TaskType>({} as TaskType)
    const {toggleTaskCompleted, editProjectTask, deleteProjectTask} = useContext(ProjectContext) 

    const startEditTask = (task: TaskType) => {
        setToBeEdited(true)
        setEditedTask({...task})
    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setEditedTask({...editedTask, text: e.target.value})
    }

    const handleCancel = () => {
        setToBeEdited(false)
    }

    const submitEditedTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        editProjectTask(project.id, editedTask)
        setToBeEdited(false)
    }

    const openOverlay = () => {
        setShowOverlay(true)
    };
    
    const closeOverlay = () => {
        setShowOverlay(false)
    };

    const startDeleteTask = (task: TaskType) => {
        setDeletedTask({...task})
        openOverlay()
    }

    const handleConfirm = () => {
        deleteProjectTask(project.id, deletedTask.id)
        closeOverlay()
    }

    return (
        <>
        <ul className="main__project-tasks">
            {
                project.tasks.map(task => {
                    if (toBeEdited && editedTask.id == task.id) {
                        return (
                            <form key={task.id} className={`main__project-task main__project-task--${projectColor(project.status)} main__project-task--align`} onSubmit={(e) => submitEditedTask(e)}>
                                <FaCaretRight/>
                                <input className="main__project-task-input" id={`${task.id}`} type="text" name="" value={editedTask.text} onChange={(e) => handleEditChange(e)}/> 
                                <button className="main__project-task-add" type="submit"><FaRegCheckCircle/></button>
                                <button className="main__project-task-cancel" type="button" onClick={() => handleCancel()}><FaRegTimesCircle/></button>
                            </form>
                    )
                    } else {
                        return (
                            <li key={task.id} className={`main__project-task main__project-task--${projectColor(project.status)}`}>
                                <input className="main__project-task-checkbox" type="checkbox" id={`${task.id}`} checked={task.completed} onChange={() => toggleTaskCompleted(task.id)} />
                                <label className={`main__project-task-text ${task.completed ? "main__project-task-text--completed" : ""}`} htmlFor={`${task.id}`}>{task.text}</label> 
                                <FaRegEdit style={{cursor: "pointer"}} onClick={() => startEditTask(task)}/>
                                <FaRegTrashAlt style={{cursor: "pointer"}} onClick={() =>startDeleteTask(task)}/>
                            </li>
                        )
                    }
                })
            }
            <TaskAdder project={project}/>
        </ul>
        {
            showOverlay &&
            <Overlay closeOverlay={closeOverlay}>
                <ConfirmModal title="Are You Sure?" message="The task will be deleted permanently!" closeOverlay={closeOverlay} handleConfirm={handleConfirm} />
            </Overlay>
        }
        </>
    )
})

export default ProjectLowerPart