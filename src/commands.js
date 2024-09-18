import { Command } from 'commander'

import { addTask, updateTask, deleteTask, listTasks, changeStatus } from './controllers/task.controllers.js'

const program = new Command()

program.name('TaskCLI').description('Task Tracker CLI').version('0.0.1').description('A command line tool for track tasks')

const handleAction = async (action, ...args) => {
    try {
        await action(...args)
    } catch (error) {
        console.error('Error: ', error)
    }
}

program.command('add').description('Add a new task').argument('<description>', 'Description of the Task').action((description) => handleAction(addTask, description))

program.command('update').description('Update a task').argument('<task_id>', 'ID of the Task to Update').argument('<description>', 'New Description for the task').action((task_id, description) => handleAction(updateTask, task_id, description))

program.command('delete').description('Delete a task').argument('<task_id>', 'ID of the Task to Delete').action((task_id) => handleAction(deleteTask, task_id))

program.command('mark-in-progress').description('Mark a task as in progress').argument('<task_id>', 'ID of the task to mark in progress').action((task_id) => handleAction(changeStatus, 0, task_id))

program.command('mark-done').description('Mark a task as completed').argument('<task_id>', 'ID of the task to mark done').action((task_id) => handleAction(changeStatus, 1, task_id))

program.command('list').description('List all tasks, or by status').argument('[status]', 'No necessary, list only list all tasks, list')
    .argument('[done]', 'List only Tasks Are Done')
    .argument('[todo]', 'List only Tasks are to do')
    .argument('[in-progress]', 'List only Task are in progress')
    .action((status) => handleAction(listTasks, status))

program.parse()