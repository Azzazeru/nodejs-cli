# How to Use

### Adding a new task
* taskcli add "Buy groceries"
##### Output: Task added successfully (ID: 1)

### Updating and deleting tasks
* taskcli update 1 "Buy groceries and cook dinner"
* taskcli delete 1

### Marking a task as in progress or done
* taskcli mark-in-progress 1
* taskcli mark-done 1

### Listing all tasks
* taskcli list

### Listing tasks by status
* taskcli list done
* taskcli list todo
* taskcli list in-progress

