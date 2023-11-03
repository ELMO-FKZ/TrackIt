import { v4 as uuidv4 } from "uuid";
import { ProjectType } from "../@types/project";

export function initProject() {
    
    const projectId = uuidv4();
    const taskId = uuidv4();
    const initProject: ProjectType = {
        id: projectId, 
        title: "", 
        status: "To Do", 
        startDate: "", 
        endDate: "", 
        tasks: [
            { id: taskId, text: "", completed: false }
        ]
    }
    return initProject
}