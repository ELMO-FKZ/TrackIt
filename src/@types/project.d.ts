// States :

export type TaskType = {
    id: string; 
    text: string; 
    completed: boolean;
}

export type StatusType = "To Do" | "In Progress" | "Blocked" | "Completed";

export type ProjectType = {
    id: string;
    title: string;
    status: StatusType;
    startDate: string;
    endDate: string;
    tasks: TaskType[];
}

export type DaysLeftType = number;

// Props :

export type ConfirmModalProps = {
    title: string; 
    message: string; 
    closeOverlay: () => void;
    handleConfirm: () => void;
}

export type InformModalProps = {
    title: string; 
    message: string; 
    closeOverlay: () => void;
}

export type OverlayProps = {
    closeOverlay: () => void;
    children: React.ReactNode;
}

export type ProjectProps = {
    project: ProjectType;
}

export type ProjectFormAdderProps = {
    closeOverlay: () => void;
}

export type ProjectFormEditorProps = {
    project: ProjectType; 
    closeOverlay: () => void;
}

export type ProjectLowerPartProps = {
    project: ProjectType;
}

export type ProjectMenuProps = {
    project: ProjectType; 
    closeOverlay: () => void;
    accomplishment: number; 
    showNextDelete: () => void; 
    showNextEdit: () => void; 
}

export type ProjectUpperPartProps = {
    extend: boolean; 
    handleExtend: () => void;
    project: ProjectType;
}

export type TaskAdderProps = {
    project: ProjectType;
}

export type WidgetsProps = {
    widgetColor: "white" | "yellow" | "red" | "green";
    widgetTitle: "To Do" | "In Progress" | "Blocked" | "Completed";
    widgetNumber: number;
}

export type ProjectContextProps = {
    projects: ProjectType[];
    addProject: (project: ProjectType) => void; 
    deleteProject: (ProjectId: string) => void; 
    editProject: (editedProject: ProjectType) => void; 
    changeProjectStatus: (projectId: string, status: StatusType) => void; 
    clearCompleted: () => void; 
    toggleTaskCompleted: (taskId: string) => void;
    editProjectTask: (projectId: string, task: TaskType) => void;
    deleteProjectTask: (projectId: string, taskId: string) => void;
    addProjectTask: (projectId: string, task: TaskType) => void;
}

export type ProjectContextProviderProps = {
    children: React.ReactNode;
}