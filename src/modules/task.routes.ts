
import { Router } from 'express';
import * as taskController from './task.controller.js';

const router = Router();


router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTaskStatus);
router.patch('/:id', taskController.updateTaskStatus);
router.delete('/:id', taskController.deleteTask);

export default router;
