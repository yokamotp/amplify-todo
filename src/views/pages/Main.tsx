import { Container } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React from 'react'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'

const Main = () => {
    return (
        <Container maxW='100%'>
            <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab>現場</Tab>
                    <Tab>計画</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <TodoList title='工程' isDoneList={false} defaultDispOfList={true} />
                        <AddTodo />

                    </TabPanel>
                    <TabPanel>


                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Container>
    )
}

export default Main
