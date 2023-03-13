// import  from '@chakra-ui/icon/dist/icon';
import {
    Flex,
    Text,
    Icon,
    Container,
    useDisclosure,
    Button,
    IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import {
    RiCheckboxBlankCircleLine,
    RiCheckboxCircleFill,
    RiMenuLine,
    RiCloseLine,
    RiChatNewLine,
    RiChatNewFill,
} from "react-icons/ri";
import { BsFillTrashFill } from "react-icons/bs";
// import { deleteTodo, updateTodo } from '../../stores/slices/todo/todoSlices';
// import { useAppDispatch } from '../../stores/hooks';
import { deleteTodoApi, updateTodoApi } from "../../stores/slices/todo/todoAPI";
import PictureList from "./PictureList";
import TodoModalMenu from "./TodoModalMenu";

const TodoItem = ({ id, content, isDone, isDoneList }) => {
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
    };
    const handleDelete = async () => {
        try {
            const data = { id };
            await deleteTodoApi(data);
        } catch (error) {
            console.error(error);
        }
        // dispatch(deleteTodo(id));
    };

    //Toggle用
    const [isShowText, setShowText] = useState(false);

    const { getDisclosureProps, getButtonProps } = useDisclosure();

    const buttonProps = getButtonProps();
    const disclosureProps = getDisclosureProps();
    //ここまで

    return (
        <>
            <Container borderBottom="2px" borderColor="gray.300">
                <Flex w="100%" align="center" justify="space-between">
                    <Flex align="center">
                        <Icon
                            as={RiMenuLine}
                            color="teal"
                            cursor="pointer"
                            h={6}
                            mr={2}
                            w={6}
                        />

                        <Text fontSize="xl">{content}</Text>
                    </Flex>

                    <Flex>
                        {/* <Button {...buttonProps}>Toggle Me</Button> */}
                        <Icon
                            as={isShowText ? RiChatNewFill : RiChatNewLine}
                            color="teal"
                            cursor="pointer"
                            h={6}
                            mr={2}
                            w={6}
                            onClick={() => setShowText(!isShowText)}
                        />
                    </Flex>
                </Flex>
            </Container>
            {isShowText && (
                <Text mt={4}>
                    This text is being visibly toggled hidden and shown by the
                    button.
                </Text>
            )}
            <PictureList id={id} isDoneList={isDoneList}></PictureList>
        </>
    );
};

export default TodoItem;
