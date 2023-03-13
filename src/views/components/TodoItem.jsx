// import  from '@chakra-ui/icon/dist/icon';
import { Flex, Text, Icon, Card } from "@chakra-ui/react";
import { useState } from "react";
import { RiMenuLine, RiChatNewLine, RiChatNewFill } from "react-icons/ri";
import { deleteTodoApi, updateTodoApi } from "../../stores/slices/todo/todoAPI";
import PictureList from "./PictureList";

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
    return (
        <>
            <Card maxW="sm">
                {/* <Container borderBottom="2px" borderColor="gray.300"> */}
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
                {isShowText && (
                    <Text mt={4}>
                        This text is being visibly toggled hidden and shown by
                        the button.
                    </Text>
                )}
                <PictureList
                    ctureList
                    id={id}
                    isDoneList={isDoneList}
                ></PictureList>
            </Card>
        </>
    );
};

export default TodoItem;
