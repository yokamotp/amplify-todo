import { HStack, Image, Stack, StackDivider, VStack } from '@chakra-ui/react';
import React from 'react'

type Props = {
    id: string;
}

const PictureList: React.VFC<Props> = ({ id }) => {
    return (
        <HStack
            align='stretch'
            w={{ base: '90vw', sm: '80vw', md: '70vw', lg: '60vw' }}
            border='2px'
            borderColor='gray.300'
            borderRadius='md'
            p={4}
            maxH='100vh'
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
    )
}

export default PictureList
