import fs from 'fs/promises'
import path from 'path'

const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), '../../', 'tasks.json')

const readFile = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        throw new Error('Error reading file: ', error.message)
    }
}

const writeFile = async (tasks) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf8')
    } catch (error) {
        throw new Error('Error writing file: ', error.message)
    }
}

export const addTask = async (description) => {

    const tasks = await readFile();

    const newTask = {
        task_id: tasks.length + 1,
        description: description,
        status: 'Pending',
        createAt: new Date(),
        updatedAt: new Date()
    };

    tasks.push(newTask)
    await writeFile(tasks)

    console.log(`Task Added Successfully (ID: ${newTask.task_id})`)

}

export const updateTask = async (task_id, description) => {

    const tasks = await readFile();
    const task = tasks.find(t => t.task_id == task_id)

    if (!task) throw new Error('Task not Found')

    task.description = description
    task.updatedAt = new Date()

    await writeFile(tasks)

    console.log(`Task Updated Successfully (ID: ${task.task_id})`)

}

export const deleteTask = async (task_id) => {

    const tasks = await readFile()
    const index = tasks.findIndex(t => t.task_id == task_id)
    if (index === -1) throw new Error('Task Not Found')
    tasks.splice(index, 1)
    await writeFile(tasks)
    console.log(`Task deleted successfully (ID: ${task_id})`)
}

export const listTasks = async (status) => {

    switch (status) {
        case 'done':
            status = 'Done'
            break;
        case 'todo':
            status = 'To Do'
            break;
        case 'in-progress':
            status = 'In Progress'
            break;
    }

    const tasks = await readFile()
    const filteredTasks = status ? tasks.filter(t => t.status.toLowerCase() == status.toLowerCase()) : tasks
    console.table(filteredTasks)
}

export const changeStatus = async (option, task_id) => {
    const tasks = await readFile()
    const task = tasks.find(t => t.task_id == task_id)
    if (!task) throw new Error('Task Not Found')

    switch (option) {
        case 0:
            if (task.status === 'Done') return console.log('Task Already Done')
            task.status = 'In Progress'
            break
        case 1:
            task.status = 'Done'
            break
        default:
            return console.log('Invalid Option')
    }
    task.updatedAt = new Date()
    await writeFile(tasks)
    console.log(`Task ${task.task_id} status updated Successfully`)
}