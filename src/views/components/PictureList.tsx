import { Box, Flex, HStack, IconButton, Image } from '@chakra-ui/react';
import React, { useState } from 'react'
import { AiOutlineCamera, AiOutlinePicture } from 'react-icons/ai'


type Props = {
    id: string;
    setOpenDialog: any;
}

const PictureList: React.VFC<Props> = ({ id, setOpenDialog }) => {

    return (
        <Box
            p={2}
            color='gray.100'
            borderRadius='md'
            maxH='100vh'
            border='2px'
        >
            <Flex direction='row'>
                <Flex direction='column'
                    marginRight={1}>
                    <IconButton
                        aria-label='Take Photo'
                        colorScheme='blue'
                        size='lg'
                        marginBottom={1}
                        icon={<AiOutlineCamera />}
                        onClick={() => setOpenDialog(true)}
                    />

                    <IconButton
                        aria-label='Take Photo'
                        colorScheme='teal'
                        size='lg'
                        icon={<AiOutlinePicture />} />
                </Flex>

                <HStack
                    align='stretch'
                    w={{ base: '90vw', sm: '80vw', md: '70vw', lg: '60vw' }}
                    overflow='scroll'
                    spacing='4px'
                >

                    <Image
                        boxSize='100px'
                        objectFit='cover'
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                    />
                    <Image
                        boxSize='100px'
                        objectFit='cover'
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                    />
                    <Image boxSize='100px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
                    <Image boxSize='100px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
                    <Image boxSize='100px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
                    <Image boxSize='100px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
                    <Image boxSize='100px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
                </HStack>
            </Flex>
        </Box>
    )
}

export default PictureList
