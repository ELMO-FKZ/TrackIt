import { useEffect, useContext } from "react";
import { ProjectContext } from "../contexts/ProjectContext";

const useStatusChanger = (accomplishment: number, projectId: string) => {

    const{changeProjectStatus} = useContext(ProjectContext)

    useEffect(() => {
        if (accomplishment === 100) {
            changeProjectStatus(projectId, "Completed")
        } else if (accomplishment === 0) {
            changeProjectStatus(projectId, "To Do")
        } else {
            changeProjectStatus(projectId, "In Progress")
        }
    },[accomplishment])
};

export default useStatusChanger;


