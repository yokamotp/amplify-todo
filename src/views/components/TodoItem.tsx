// import  from '@chakra-ui/icon/dist/icon';
import { Flex, Text, Icon } from '@chakra-ui/react';
// import React, { useEffect } from 'react';
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from 'react-icons/ri';
import { BsFillTrashFill } from 'react-icons/bs';
// import { deleteTodo, updateTodo } from '../../stores/slices/todo/todoSlices';
// import { useAppDispatch } from '../../stores/hooks';
import { deleteTodoApi, updateTodoApi } from '../../stores/slices/todo/todoAPI';
import PictureList from './PictureList';


type Props = {
    id: string;
    content: string;
    isDone: boolean;
    setOpenDialog: (openDialog: boolean) => void;
}

const TodoItem: React.VFC<Props> = ({ id, content, isDone, setOpenDialog }) => {
    // const dispatch = useAppDispatch();
    const handleUpdate = async () => {
        try {
            const switchIsDone = !isDone;
            const data = { id, isDone: switchIsDone };
            await updateTodoApi(data);
        } catch (error) {
            console.error(error);
        }
        // dispatch(updateTodo(id));
    }
    const handleDelete = async () => {
        try {
            const data = { id };
            await deleteTodoApi(data);
        } catch (error) {
            console.error(error);
        }
        // dispatch(deleteTodo(id));
    }
    return (
        <div>
            <Flex w='100%' align='center' justify='space-between'>
                <Flex align='center'>
                    <Icon
                        as={isDone ? RiCheckboxCircleFill : RiCheckboxBlankCircleLine}
                        color='teal'
                        cursor='pointer'
                        h={6}
                        mr={2}
                        w={6}
                        onClick={handleUpdate}
                    />

                    <Text fontSize='xl'>{content}</Text>

                </Flex>
                <Flex>
                    <Icon as={BsFillTrashFill} color='pink' cursor='pointer' h={5} onClick={handleDelete} />
                </Flex>
            </Flex>
            <PictureList id={id} setOpenDialog={setOpenDialog}></PictureList>
        </div>
    )
}

export default TodoItem
