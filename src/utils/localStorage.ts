import { ProjectType } from "../@types/project"

export const getProject = (key: string): ProjectType[] | null => {
    return JSON.parse(localStorage.getItem(key)!)
}

export const setProject = (key: string, data: ProjectType[]): unknown => {
    return localStorage.setItem(key, JSON.stringify(data))
}

export const getMode = (key: string): boolean | null => {
    return JSON.parse(localStorage.getItem(key)!)
}

export const setMode = (key: string, data: boolean): unknown => {
    return localStorage.setItem(key, JSON.stringify(data))
}