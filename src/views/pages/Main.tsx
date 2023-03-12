import { Container } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React from 'react'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'

const Main = () => {
    return (
        <Container maxW='100%'>
            <TodoList title='工程' isDoneList={false} defaultDispOfList={true} />
            <AddTodo />
            <TodoList title='DoneList' isDoneList={true} defaultDispOfList={false} />
        </Container>
    )
}

export default Main
