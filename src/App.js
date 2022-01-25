import { useReducer } from 'react'
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

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

const filterIndex = {
  'all': 0,
  'active': 1,
  'completed': 2,
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
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

  const addTask = (text, checked) => {
    dispatch({
      type: 'ADD_TASK',
      payload: {
        text,
        checked,
      }
    })
  }

  const removeTask = (id) => {
    if (window.confirm('Вы уверенны, что хотите удалить статью?'))
      return dispatch({
        type: 'REMOVE_POST',
        payload: id,
      });
  };

  const toggleCompleted = (id) => {
    return dispatch({
      type: 'TOGGLE_COMPLETED',
      payload: id
    })
  }

  const resetTasks = () => {
    if (window.confirm('Вы уверенны, что хотите очистить все задачи?'))
      return dispatch({
        type: 'RESET',
      })
  }

  const editTask = (id) => {
    const newTask = window.prompt('Изменить задачу')
    if(newTask)
    return dispatch({
      type: 'EDIT_TASK',
      payload: {
        id,
        newTask,
      }
    })
  }

  const checkTasksAll = () => {
    return dispatch({
      type: 'CHECK_ALL',
    })
  }

  const setFilter = (_, newIndex) => {
    const status = Object.keys(filterIndex)[newIndex]
    return dispatch({
      type: 'SET_FILTER',
      payload: status,
    })
  }

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField
          onAdd={ addTask }
        />
        <Divider />
        <Tabs onChange={ setFilter } value={ filterIndex[state.filterBy] }>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {
            state.tasks
            .filter((obj) => {
              if (state.filterBy === 'all') {
                return true
              }

              if (state.filterBy === 'completed') {
                return obj.completed
              }

              if(state.filterBy === 'active'){
                return ! obj.completed
              }
            }).map(item => {
              return(
                <Item
                  key={ item.id }
                  checked={ item.completed }
                  id={ item.id }
                  text={ item.text }
                  onEdit={ editTask }
                  onRemove={ removeTask }
                  onToggle={ () => toggleCompleted(item.id) }
                />
              )
            })
          }
        </List>
        <Divider />
        <div className="check-buttons">
          <Button disabled={ !state.tasks.length } onClick={ checkTasksAll }>Отметить всё</Button>
          <Button disabled={ !state.tasks.length } onClick={ resetTasks }>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
