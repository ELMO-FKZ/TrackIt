import { useState, useContext, memo } from "react"
import { ProjectContext } from "../../contexts/ProjectContext"
import { FaPlus, FaCaretRight, FaRegTimesCircle, FaRegCheckCircle } from "react-icons/fa"
import { v4 as uuidv4 } from "uuid"
import { projectColor } from "../../utils/projectColor"
import { TaskAdderProps } from "../../@types/project"
import "./taskAdder.css"

const TaskAdder = memo(function TaskAdder({project}: TaskAdderProps) {

    const [isAddClicked, setIsAddClicked] = useState(false)
    const [newTask, setNewTask] = useState({id: "", text: "", completed: false})
    const {addProjectTask} = useContext(ProjectContext)
    const inputId = uuidv4()

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, id } = e.target
        const taskToBeAdded = {...newTask, id: id, [name]: value }
        setNewTask(taskToBeAdded)
    }
    
    const handleAddTask = () => {
        setIsAddClicked(true)
    }

    const handleCancel = () => {
        setIsAddClicked(false)
        setNewTask({id: "", text: "", completed: false});
    }
    
    const submitNewTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addProjectTask(project.id, newTask)
        handleCancel()
    }

    return (
        <>
        {isAddClicked && 
            <form className={`main__project-task main__project-task--${projectColor(project.status)} main__project-task--align`} onSubmit={(e) => submitNewTask(e)}>
                <FaCaretRight/>
                <input className="main__project-task-input" id={inputId} type="text" name="text" value={newTask.text} onChange={(e) => handleFormChange(e)} required/> 
                <button className="main__project-task-add" type="submit"><FaRegCheckCircle/></button>
                <button className="main__project-task-cancel" type="button" onClick={() => handleCancel()}><FaRegTimesCircle/></button>
            </form>
        }
        {!isAddClicked && <button className="main__project-more" onClick={() => handleAddTask()}><FaPlus />Add more tasks</button>}
        </>
    )
})

export default TaskAdder