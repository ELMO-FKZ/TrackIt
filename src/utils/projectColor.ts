import { StatusType } from "../@types/project"

export const projectColor = (status: StatusType) => {
    if (status == "In Progress") {
        return "yellow"
    } else if (status == "Blocked") {
        return "red"
    } else if (status == "Completed") {
        return "green"
    } else {
        return "grey"
    }
}