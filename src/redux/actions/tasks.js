export const addTask = (text, checked) => {
    return {
        type: 'ADD_TASK',
        payload: {
            text,
            checked,
        }
    }
}

export const removeTask = (id) => {
    return {
        type: 'REMOVE_POST',
        payload: id,
    }
}

export const toggleCompleted = (id) => {
    return {
        type: 'TOGGLE_COMPLETED',
        payload: id,
    }
}

export const resetTasks = () => {
    return {
        type: 'RESET',
    }
}

export const editTask = (id, newTask) => {
    return {
        type: 'EDIT_TASK',
        payload: {
          id,
          newTask,
        }
    }
}

export const checkTasksAll = () => {
    return {
        type: 'CHECK_ALL',
    }
}