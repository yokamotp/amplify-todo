import { Center, Flex, Heading, StackDivider, VStack, Text, Container } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { deleteTodoRealTime, fetchTodoListAsync, fetchTodoRealTime, selectTodoList, updateTodoRealTime } from '../../stores/slices/todo/todoSlices';
import { DataStore } from 'aws-amplify';
import { Todo } from '../../models';
import WebcamDialog from "../../../src/webcam/WebcamDialog";

type Props = {
    title: string;
    defaultDispOfList: boolean;
    isDoneList: boolean;
}

const TodoList: React.VFC<Props> = ({ title, defaultDispOfList, isDoneList }) => {
    const todoList = useAppSelector(selectTodoList);
    const [openDialog, setOpenDialog] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

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

    console.log("撮影データ：" + imageSrc)

    return (
        <Flex flexDir='column' w='100%'>
            <WebcamDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                setImageSrc={setImageSrc}
            />
            <Center mb={2}>
                <Heading onClick={() => setDispTodoList(!isDispTodoList)}>
                    <Flex>
                        {title}
                    </Flex>
                </Heading>
            </Center>
            {isDispTodoList && (
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
                            todoList
                                .filter((item) => {
                                    return item.isDone === isDoneList;
                                })
                                .map((item) => {
                                    return <TodoItem key={item.id} id={item.id} content={item.content} isDone={item.isDone} setOpenDialog={setOpenDialog} />
                                })
                        )}
                </VStack>

            )}
        </Flex>

    )
}

export default TodoList
