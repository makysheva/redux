import { useReducer } from 'react'
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

const reducer = (state, action) => {
  if (action.type === 'ADD_TASK') {
    return [
      ...state,
      {
        id: state[state.length - 1].id + 1,
        text: action.payload.text,
        completed: action.payload.checked,
      }
    ]
  }

  if (action.type === 'REMOVE_POST') {
    return state.filter(item => item.id !== action.payload)
  }

  if (action.type === 'TOGGLE_COMPLETED') {
    return state.map(obj => {
      if (obj.id === action.payload) {
        return {
          ...obj,
          completed: ! obj.completed
        }
      }

      return obj
    })
  }

  return state
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, [
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
  ])

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
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {
            state.map(item => {
              return(
                <Item
                  key={ item.id }
                  checked={ item.completed }
                  id={ item.id }
                  text={ item.text }
                  onRemove={ removeTask }
                  onToggle={ () => toggleCompleted(item.id) }
                />
              )
            })
          }
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
