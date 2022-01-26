import { useDispatch, useSelector } from 'react-redux'
import { Paper, Divider, Button, List } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';
import { Filter } from './components/Filter';

import { addTask, removeTask, toggleCompleted, resetTasks, editTask, checkTasksAll } from './redux/actions/tasks'

const App = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const handleClickAdd = (text, checked) => {
    dispatch(addTask(text, checked))
  }

  const handleClickRemove = (id) => {
    if (window.confirm('Вы уверенны, что хотите удалить статью?'))
      return dispatch(removeTask(id));
  };

  const handleChangeToggle = (id) => {
    return dispatch(toggleCompleted(id))
  }

  const handleClickReset = () => {
    if (window.confirm('Вы уверенны, что хотите очистить все задачи?'))
      return dispatch(resetTasks())
  }

  const handleClickEdit = (id) => {
    const newTask = window.prompt('Изменить задачу')
    if(newTask)
      return dispatch(editTask(id, newTask))
  }

  const handleClickCheckAll = () => {
    return dispatch(checkTasksAll())
  }

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField
          onAdd={ handleClickAdd }
        />
        <Divider />
        <Filter />
        <Divider />
        <List>
          {
            state.tasks
            .filter((obj) => {
              if (state.filter.filterBy === 'all') {
                return true
              }

              if (state.filter.filterBy === 'completed') {
                return obj.completed
              }

              if(state.filter.filterBy === 'active'){
                return ! obj.completed
              }
            }).map(item => {
              return(
                <Item
                  key={ item.id }
                  checked={ item.completed }
                  id={ item.id }
                  text={ item.text }
                  onEdit={ handleClickEdit }
                  onRemove={ handleClickRemove }
                  onToggle={ () => handleChangeToggle(item.id) }
                />
              )
            })
          }
        </List>
        <Divider />
        <div className="check-buttons">
          <Button disabled={ !state.tasks.length } onClick={ handleClickCheckAll }>Отметить всё</Button>
          <Button disabled={ !state.tasks.length } onClick={ handleClickReset }>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
