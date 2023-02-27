import { Center, Flex, Heading, StackDivider, VStack, Text } from '@chakra-ui/react'
import React from 'react'
import TodoItem from './TodoItem'
import { useAppSelector } from '../../stores/hooks';
import { selectTodoList } from '../../stores/slices/todo/todoSlices';


const TodoList: React.VFC = () => {
    const todoList = useAppSelector(selectTodoList);
    // const todoList = [
    //     { "id": "001", "content": "aaa", "isDone": true },
    // ]
    console.log({ todoList });
    return (
        <Flex flexDir='column'>
            <Center mb={8}>
                <Heading>
                    TodoList
                </Heading>
            </Center>
            <VStack divider={<StackDivider borderColor='gray.200' />}
                align='stretch'
                w={{ base: '90vw', sm: '80vw', md: '70vw', lg: '60vw' }}
                border='2px'
                borderColor='gray.300'
                borderRadius='md'
                p={4}
                maxH='65vh'
                overflow='scroll'
            >
                {todoList.length === 0 ?
                    (<Text align='center' fontWeight='bold' fontSize='lg'>TodoListはありません。</Text>) :
                    (
                        todoList.map((item) => {
                            return <TodoItem key={item.id} id={item.id} content={item.content} isDone={item.isDone} />
                        })
                    )}
            </VStack>
        </Flex>
    )
}

export default TodoList
