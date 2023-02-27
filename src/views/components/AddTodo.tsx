import { Box, Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    example: string,
    exampleRequired: string,
}

const AddTodo:React.VFC = () => {
    const {handleSubmit, register, formState:{ errors, isSubmitting}, reset } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        reset();
    }
    // const onSubmit: SubmitHandler<Inputs> = (data: { content: string }) => {
    //     const { error } = data;
    //     alert({ error })
    //     reset();
    // }
    // const onSubmit= (data:{content:string}) => {
    //     const { content } = data;
    //     alert({ content })
    //     reset();
    // }

  return (
    <Box display='felx' justifyContent='center'>
        <form onSubmit={handleSubmit(onSubmit)}>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <FormControl
                // isInvalid={true}
                w={{ base: '90vw', sm: '80vw', md: '70vw', lg: '60vw'}}>
                <Input id='content' placeholder='Enter todo' {...register('example', {required:'Please enter todo.'})}/>
                <FormErrorMessage>{errors.exampleRequired && errors.exampleRequired.message}</FormErrorMessage>

            </FormControl>
            <Box w='100%' display='flex' justifyContent='felx-end'>
                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                    Submit
                </Button>
            </Box>
        </form>
    </Box>

  )
}

export default AddTodo
