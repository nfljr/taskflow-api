import type {Request, Response} from "express"
import { logger } from "../utils/logger.js"
import { success, error } from "../utils/response.js"

import {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} from "../services/taskService.js"
import { validateTask, validateTaskUpdate } from "../dto/task.dto.js"

export async function create(req : Request, res: Response) {
    try {
        const {title , priority} = req.body

        //validasi DTO
        validateTask(title)

        const task = await createTask(
            title, 
            priority || "medium"
        )

        res.status(201).json({
            success : true,
            data: task
        })
    } catch (err:any){
        res.status(500).json({
            error : err.message
        })
    }
}

export async function getAll(req: Request, res :Response) {
    try {
        const tasks = await getTasks({
            q: req.query.q as string,
            done: req.query.done as string,
            priority: req.query.priority as string,
            sort: req.query.sort as string,

            //paginated 
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 5
        })

        res.json(success("tasks fetched", tasks))
    } catch (err : any){
        return res.status(500).json(error(err.message))
    }
}

export async function update(req : Request, res: Response) {
    const id = req.params.id as string
    
    try{
        validateTaskUpdate(req.body)

        const task = await updateTask(id, req.body)

        return res.json(success("Task Updated", task))

    } catch (err : any) {
        return res.status(404).json({
            error : err.message
        });
    }
}

export async function remove(req : Request, res: Response) {
    const id = req.params.id as string

    if (!id) {
        return res.status(400).json({
            error :"invalid Id"
        });
    }
    
    try{
        await deleteTask(id)

        return res.json(success("Task Deleted", null));
    } catch (err : any) {
        return res.status(404).json({
            error : err.message
        });
    }
}