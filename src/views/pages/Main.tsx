import { Container } from '@chakra-ui/react'
import React from 'react'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'

const Main = () => {
    return (
        <Container maxW='100%'>
            <TodoList title='TodoList' isDoneList={false} defaultDispOfList={true} />
            <AddTodo />
            <TodoList title='DoneList' isDoneList={true} defaultDispOfList={false} />
        </Container>
    )
}

export default Main
