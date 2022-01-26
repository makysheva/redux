import { createStore } from 'redux'

const reducer = (state, action) => {
    switch(action.type) {
      case 'ADD_TASK':
        return {
          ...state,
          tasks: [
            ...state.tasks,
            {
              id: state.tasks[state.tasks.length - 1].id + 1,
              text: action.payload.text,
              completed: action.payload.checked,
            }
          ]
        };

      case 'REMOVE_POST':
        return {
          ...state,
          tasks: state.tasks.filter(item => item.id !== action.payload)
        };

      case 'TOGGLE_COMPLETED':
        return {
          ...state,
          tasks: state.tasks.map(obj =>
            obj.id === action.payload
            ? ({
              ...obj,
              completed: ! obj.completed
            })
            : obj
          )
        };

      case 'EDIT_TASK':
        return {
          ...state,
          tasks: state.tasks.map(obj =>
            obj.id === action.payload.id
              ? ({
                ...obj,
                text: action.payload.newTask
              })
              : obj
          )
        };

      case 'RESET':
        return {
          ...state,
          tasks: [],
        };

      case 'CHECK_ALL':
        return {
          ...state,
          tasks: state.tasks.map(obj => ({
              ...obj,
              completed: true,
            })
          )
        };

      case 'SET_FILTER':
        return {
          ...state,
          filterBy: action.payload
        };

      default:
        return state
    }
  }

const store = createStore(reducer, {
    filterBy: 'all',
    tasks: [
      {
        id: 1,
        text: 'Задача создана с помощью редьюсера',
        completed: false,
      },
      {
        id: 2,
        text: 'Разобраться в редакс',
        completed: true,
      },
    ]
})

export default store