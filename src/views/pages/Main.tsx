import React from 'react'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'

const Main = () => {
    return (
        <div>
            <TodoList title='TodoList' isDoneList={false} defaultDispOfList={true} />
            <AddTodo />
            <TodoList title='DoneList' isDoneList={true} defaultDispOfList={false} />
        </div>
    )
}

export default Main
