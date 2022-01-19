import { useReducer, useState } from 'react'
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

const reducer = (state, action) => {
  if (action.type === 'ADD_TASK') {
    return [
      ...state,
      {
        id: action.id,
        text: action.text,
        completed: action.completed,
      }
    ]
  }
  return state
}

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [isChecked, setIsChecked] = useState(false)
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

  const addTask = () => {
    dispatch({
      type: 'ADD_TASK',
      text: inputValue,
      completed: isChecked,
    })

    setInputValue('')
    setIsChecked(false)
  }

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField
          onClickAdd={ addTask }
          inputValue={ inputValue }
          isChecked={ isChecked }
          setInputValue={ setInputValue }
          setIsChecked={ setIsChecked }
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
                <Item key={ item.id } text={ item.text } />
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
