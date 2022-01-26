import { createStore, combineReducers } from 'redux'
import { tasksReducer } from './reducers/tasks'
import { filterReducer } from './reducers/filter'

const rootReducer = combineReducers({
    filter: filterReducer,
    tasks: tasksReducer,
})

const store = createStore(rootReducer)

export default store