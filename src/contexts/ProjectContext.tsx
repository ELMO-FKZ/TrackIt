import { useState, useEffect, createContext, useMemo } from "react"
import { getProject } from "../utils/localStorage"
import { setProject } from "../utils/localStorage"
import { ProjectType, TaskType, StatusType, ProjectContextProps, ProjectContextProviderProps } from "../@types/project"

export const ProjectContext = createContext<ProjectContextProps>({
    projects: [],
    addProject: () => {},
    deleteProject: () => {},
    editProject: () => {},
    changeProjectStatus: () => {},
    clearCompleted: () => {},
    toggleTaskCompleted: () => {},
    editProjectTask: () => {},
    deleteProjectTask: () => {},
    addProjectTask: () => {}
});

export const ProjectContextProvider = ({children}: ProjectContextProviderProps) => {

    const [projects, setProjects] = useState<ProjectType[]>(getProject("projects") || [])

    useEffect(() => {
        setProject("projects", projects)
    }, [projects])

    const addProject = (project: ProjectType) => {
        const duplicatedProject = projects.find((projectItem: ProjectType) => projectItem.id === project.id)
        if (!duplicatedProject) {
            setProjects([project, ...projects])
        }
    }

    const deleteProject = (ProjectId: string) => {
        const deletedProject = projects.find((project: ProjectType) => project.id == ProjectId) 
        if(deletedProject) {
            setProjects(projects.filter((project: ProjectType) => project.id !== ProjectId))
        }
    }

    const editProject = (editedProject: ProjectType) => {
        const updatedProjects = projects.map((project: ProjectType) => {
            if (project.id === editedProject.id) {
                return {...project, title: editedProject.title, startDate: editedProject.startDate, endDate: editedProject.endDate}
            }
            return project
        })
        setProjects(updatedProjects)
    }

    const changeProjectStatus = (projectId: string, status: StatusType) => {
        const updatedProjects = projects.map((project: ProjectType) => {
            if (project.id === projectId ) {
                return {...project, status: status}
            }
            return project
        })
        setProjects(updatedProjects)
    }

    const clearCompleted = () => {
        setProjects(projects.filter((project: ProjectType) => project.status !== "Completed"))
    }

    const toggleTaskCompleted = (taskId: string) => {
        const updatedProjects = projects.map((project: ProjectType) => {
            const updatedTasks = project.tasks.map(task => {
                if (task.id === taskId) {
                    return {...task, completed: !task.completed}
                }
                return task
            });
            return {...project, tasks: updatedTasks}
        });
        setProjects(updatedProjects)
    }

    const editProjectTask = (projectId: string, task: TaskType) => {
        const updatedProjects = projects.map((project: ProjectType) => {
            if (project.id === projectId) {
                const updatedTasks = project.tasks.map(taskItem => {
                    if (taskItem.id === task.id) {
                        return {...taskItem, text: task.text}
                    }
                    return taskItem
                })
                return {...project, tasks: updatedTasks}
            }
            return project
        })
        setProjects(updatedProjects)
    }

    const deleteProjectTask = (projectId: string, taskId: string) => {
        const updatedProjects = projects.map((project: ProjectType) => {
            if (project.id === projectId ) {
                const updatedTasks = project.tasks.filter(task => task.id !== taskId)
                return {...project, tasks: updatedTasks}
            }
            return project
        })
        setProjects(updatedProjects)
    }

    const addProjectTask = (projectId: string, task: TaskType) => {
        const updatedProjects = projects.map((project: ProjectType) => {
            if (project.id === projectId ) {
                return {...project, tasks: [...project.tasks, task]}
            }
            return project
        })
        setProjects(updatedProjects)
    }

    const contextValues = useMemo(() => {
        return { 
            projects, 
            addProject, 
            deleteProject, 
            editProject, 
            changeProjectStatus, 
            clearCompleted, 
            toggleTaskCompleted,
            editProjectTask,
            deleteProjectTask,
            addProjectTask,
        }
    }, [projects])

    return (
        <ProjectContext.Provider value={contextValues}>
            {children}
        </ProjectContext.Provider>
    )
}