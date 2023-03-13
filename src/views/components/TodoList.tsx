import { Center, Flex, Heading, StackDivider, VStack, Text, Container } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { deleteTodoRealTime, fetchTodoListAsync, fetchTodoRealTime, selectTodoList, updateTodoRealTime } from '../../stores/slices/todo/todoSlices';
import { DataStore } from 'aws-amplify';
import { Todo } from '../../models';

type Props = {
    title: string;
    defaultDispOfList: boolean;
    isDoneList: boolean;
}

const TodoList: React.VFC<Props> = ({ title, defaultDispOfList, isDoneList }) => {
    const todoList = useAppSelector(selectTodoList);
    // const todoList = [
    //     { "id": "001", "content": "aaa", "isDone": true },
    // ]
    console.log({ todoList });
    const dispatch = useAppDispatch();
    const [isDispTodoList, setDispTodoList] = useState<boolean>(defaultDispOfList);


    useEffect(() => {
        const fetchTodoList = async () => {
            await dispatch(fetchTodoListAsync());
        };
        fetchTodoList();
    }, [dispatch]);

    useEffect(() => {
        const subscription = DataStore.observe(Todo).subscribe((msg) => {
            switch (msg.opType) {
                case 'INSERT':
                    dispatch(fetchTodoRealTime(msg.element));
                    break;
                case 'UPDATE':
                    dispatch(updateTodoRealTime(msg.element));
                    break;
                case 'DELETE':
                    dispatch(deleteTodoRealTime(msg.element));
                    break;
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [dispatch])


    return (
        <Flex flexDir='column' w='100%'>

            {isDispTodoList && (
                <VStack
                    align='stretch'

                    maxH='65vh'
                    overflow='scroll'
                >
                    {todoList.length === 0 ?
                        (<Text align='center' fontWeight='bold' fontSize='lg'>TodoListはありません。</Text>) :
                        (
                            todoList
                                .filter((item) => {
                                    return item.isDone === isDoneList;
                                })
                                .map((item) => {
                                    return <TodoItem key={item.id} id={item.id} content={item.content} isDone={item.isDone} isDoneList={isDoneList} />
                                })
                        )}
                </VStack>

            )}
        </Flex>

    )
}

export default TodoList
