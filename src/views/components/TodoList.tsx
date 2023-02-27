import { Center, Flex, Heading, StackDivider, VStack } from '@chakra-ui/react'
import React from 'react'
import TodoItem from './TodoItem'

const TodoList: React.VFC = () => {
  const todoList= [
    {id: 'aaa', content: 'aaa', isDone: true},
    {id: 'bbb', content: 'bbb', isDone: true},
    {id: 'ccc', content: 'ccc', isDone: true},
    {id: 'ddd', content: 'ddd', isDone: true},
    {id: 'eee', content: 'eee', isDone: true},
]

  return (
    <Flex flexDir='column'>
      <Center mb={8}>
        <Heading>
          TodoList
        </Heading>
      </Center>
      <VStack divider={<StackDivider borderColor='gray.200'/>}
        align='stretch'
        w={{ base: '90vw', sm: '80vw', md: '70vw', lg: '60vw'}}
        border='2px'
        borderColor='gray.300'
        borderRadius='md'
        p={4}
        maxH='65vh'
        overflow='scroll'
      >
        {todoList.map((item)=>{
          return  <TodoItem id={item.id} content={item.content} isDone={item.isDone}></TodoItem>
        })}
      </VStack>
    </Flex>
  )
}

export default TodoList
