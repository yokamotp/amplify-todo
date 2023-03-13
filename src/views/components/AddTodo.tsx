import { Box, Button, Flex, FormControl, Input } from '@chakra-ui/react';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createTodoApi } from '../../stores/slices/todo/todoAPI';


type Inputs = {
    id: string,
    content: string,
    isDone: boolean,
}

const AddTodo: React.VFC = () => {
    const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await createTodoApi(data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction='row'>
                <FormControl
                    w='85%'>
                    <Input id='content' mt={1} placeholder='Enter todo' {...register('content', { required: 'Please enter todo.' })} />
                </FormControl>
                <Box w='15%' display='flex' justifyContent='end'>
                    <Button mt={1} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                        追加
                    </Button>
                </Box>
            </Flex>
        </form>
        // </Box>

    )
}

export default AddTodo
