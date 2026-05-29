import {v4 as uuid} from "uuid"

export type Task = {
    id : string
    title : string
    done : boolean
    priority : "low" | "medium" | "high"
    createdAt : string
}

import {readFile, writeFile} from "../utils/file.js"

export async function createTask(
    title : string,
    priority: "low" | "medium" | "high"
){ 
    const tasks = await readFile()

    const newTask: Task = {
        id: uuid(),
        title,
        done: false,
        priority,
        createdAt: new Date().toISOString()
    }

    tasks.push(newTask)
    await writeFile(tasks)

    return newTask
}

export async function getTasks(filters?: {
    q?: string,
    done?: string,
    priority?: string,
    sort?: string,
    page?: number,
    limit?:number
}) {
    let tasks: Task[] = await readFile()

    //search
    if (filters?.q){
        tasks = tasks.filter(task =>
            task.title
                .toLowerCase()
                .includes(filters.q!.toLowerCase())
        )
    }

    //filter done
    if (filters?.done) {
        tasks = tasks.filter(task=>
            String(task.done) === filters.done
        )
    }

    //filter priority
    if (filters?.priority){
        tasks = tasks.filter(task =>
            task.priority === filters.priority
        )
    }

    //sorting
    if (filters?.sort) {
            tasks.sort((a,b) => 
            b.createdAt.localeCompare(a.createdAt)
        )
    }

    const page = filters?.page || 1
    const limit = filters?.limit || 5

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    const paginatedTasks = tasks.slice(startIndex, endIndex)

    return {
        data: paginatedTasks,
        currentPage: page,
        limit,
        totalData: tasks.length,
        totalPage: Math.ceil(tasks.length/limit)
    }
}

export async function updateTask (id:string, data: any) {
    const tasks = await readFile()
    
    const index = tasks.findIndex((t: any) => t.id === id)
    if (index === -1) throw new Error("Task Not found")

    tasks[index] ={
        ...tasks[index],
        ...data
    }

    await writeFile(tasks)

    return tasks[index]
}

export async function deleteTask(id: string) {
    const tasks = await readFile()
    
    const filtered = tasks.filter((t: any)=> t.id !== id)

    await writeFile(filtered)

    return true
}