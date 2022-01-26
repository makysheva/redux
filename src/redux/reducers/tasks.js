const initialState = [
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

export const tasksReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'ADD_TASK':
        return [
            ...state,
            {
              id: state[state.length - 1].id + 1,
              text: action.payload.text,
              completed: action.payload.checked,
            }
        ]

      case 'REMOVE_POST':
        return state.filter(item => item.id !== action.payload)

      case 'TOGGLE_COMPLETED':
        return state.map(obj =>
            obj.id === action.payload
            ? ({
              ...obj,
              completed: ! obj.completed
            })
            : obj
        )

      case 'EDIT_TASK':
        return state.map(obj =>
            obj.id === action.payload.id
              ? ({
                ...obj,
                text: action.payload.newTask
              })
              : obj
        )

      case 'RESET':
        return []

      case 'CHECK_ALL':
        return state.map(obj => ({
            ...obj,
            completed: true,
          })
        )

      default:
        return state
    }
  }
