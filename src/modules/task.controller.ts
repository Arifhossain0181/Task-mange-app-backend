import { Request, Response, NextFunction } from 'express';
import * as taskService from './task.service.js';
import { ApiError } from '../errors/ApiError.js';



export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {title, description, status} = req.body;
        if(!title){
            throw new ApiError('Title is required', 400);
        }
        const newTask = await taskService.createTask({title, description, status});
        return res.status(201).json({
            success: true,
            data: newTask,
        });
    }
    catch (error) {
        next(error);
    }
}


export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pageParam = req.query.page;
        const page = pageParam ? Number(Array.isArray(pageParam) ? pageParam[0] : pageParam) : 1;
        const pageSize = 8; // fixed page size as requested

        const result = await taskService.getAllTasks(page, pageSize);

        return res.status(200).json({
            success: true,
            data: result.data,
            meta: result.meta,
        });
    } catch (error) {
        next(error);
    }
};

export const updateTaskStatus = async(req:Request, res:Response ,next:NextFunction) => {
    try{
        const id = String(req.params.id);
        const {title, description, status} = req.body;

        if(!id){
            throw new ApiError('Invalid task ID', 400);
        }

        const validstatuses = ["TODO", "IN_PROGRESS", "DONE"];
        if(status && !validstatuses.includes(status)){
            throw new ApiError('Invalid status value', 400);
         }

         const updateData: {
            title?: string;
            description?: string;
            status?: "TODO" | "IN_PROGRESS" | "DONE";
         } = {};

         if (title !== undefined) {
            if (!String(title).trim()) {
                throw new ApiError('Title is required', 400);
            }
            updateData.title = String(title).trim();
         }

         if (description !== undefined) {
            updateData.description = String(description).trim();
         }

         if (status !== undefined) {
            updateData.status = status;
         }

         if (Object.keys(updateData).length === 0) {
            throw new ApiError('No update data provided', 400);
         }

         const updatedTask = await taskService.updateTask(id, updateData);
         return res.status(200).json({
            success: true,
            
            data: updatedTask,

         });
    }
    catch (error) {
        next(error);
    }


}

export async function deleteTask(req: Request, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id);

    if (!id) {
      throw new ApiError('Invalid task ID', 400);
    }

    await taskService.deleteTask(id);
    return res.status(200).json({
      status: 'success',
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}
