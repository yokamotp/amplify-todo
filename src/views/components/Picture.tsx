import { Image, Stack } from '@chakra-ui/react';
import React from 'react'

type Props = {
    id: string;
}

const Picture: React.VFC<Props> = ({ id }) => {
    return (
        <Stack direction='row'>
            <Image
                boxSize='100px'
                objectFit='cover'
                src='https://bit.ly/dan-abramov'
                alt='Dan Abramov'
            />
            <Image
                boxSize='150px'
                objectFit='cover'
                src='https://bit.ly/dan-abramov'
                alt='Dan Abramov'
            />
            <Image boxSize='200px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
        </Stack>
    )
}

export default Picture
