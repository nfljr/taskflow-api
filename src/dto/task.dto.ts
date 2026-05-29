import { normalize } from "node:path"

export function validateTask(title:string) {
    if (!title || title.length < 3){
        throw new Error("title minimal 3 karakter")
    }
}

export function validateTaskUpdate(
    data: {
        title?: string
        priority?: string
    }
){
    if (data.title !== undefined) {
        if (data.title.length < 3){
            throw new Error("Title minimal 3 Karakter")
        }
    }
    if (data.priority !== undefined){
        const normalize = data.priority.toLowerCase().trim()
        const validPriority = ["low", "medium", "high"]
        
        if (!validPriority.includes(normalize)){
            throw new Error("priority must low | medium | high")
        }
    }
}