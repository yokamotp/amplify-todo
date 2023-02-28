import { Box, Button, Flex, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { useAppDispatch } from '../../stores/hooks';
import { createTodoApi } from '../../stores/slices/todo/todoAPI';
// import { createTodo } from '../../stores/slices/todo/todoSlices';


type Inputs = {
    id: string,
    content: string,
    isDone: boolean,
}

const AddTodo: React.VFC = () => {
    // const dispatch = useAppDispatch();
    const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        // console.log(data);
        // dispatch(createTodo(data));
        await createTodoApi(data);
        reset();
    }

    return (
        // <Box display='felx' justifyContent='center'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction='row'>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <FormControl
                    // isInvalid={true}
                    w='80%'>
                    {/* w={{ base: '100vw', sm: '80vw', md: '70vw', lg: '60vw' }}> */}
                    <Input id='content' mt={2} placeholder='Enter todo' {...register('content', { required: 'Please enter todo.' })} />
                    {/* <FormErrorMessage>{errors.exampleRequired && errors.exampleRequired.message}</FormErrorMessage> */}

                </FormControl>
                <Box w='20%' display='flex' justifyContent='end'>
                    <Button mt={2} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                        Submit
                    </Button>
                </Box>
            </Flex>
        </form>
        // </Box>

    )
}

export default AddTodo
