import React from 'react'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'

const Main = () => {
  return (
    <div>
      <TodoList></TodoList>
      <AddTodo/>
    </div>
  )
}

export default Main
