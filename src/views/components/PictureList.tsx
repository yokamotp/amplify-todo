import { Box, Flex, HStack, IconButton, Image } from '@chakra-ui/react';
import React, { useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import WebcamDialog from "../../../src/webcam/WebcamDialog";

import { useEffect } from 'react';
import { Storage } from "aws-amplify"

//画像アップロード
import { API } from 'aws-amplify';
import ImageUploadBox from './ImageUpload';
//

import fetchS3Objects from '../src/read_s3_images';

type Image = {
    src: string;
}

type Props = {
    id: string;
    isDoneList: boolean;
}

const PictureList: React.VFC<Props> = ({ id, isDoneList }) => {

    const [openDialog, setOpenDialog] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    //画像取得
    const [imgList, setImgList] = useState<Image[]>([]);

    useEffect(() => {
        loadImage();
    }, []);

    async function loadImage() {
        console.log('load image開始')
        const imgs: Image[] = [];
        const result = await Storage.list('', { level: 'public' });
        console.log(result)
        for (let i = 0; i < result.results.length; i++) {
            console.log("image取得成功")
            const url = await Storage.get(result.results[i].key!, { level: 'public' });
            console.log(url);
            const img: Image = {
                src: url,
            };
            imgs.push(img);
        }
        setImgList(imgs);
    }
    //ここまで

    return (
        <Box
            p={2}
            color='gray.100'
            borderRadius='md'
            maxH='100vh'
            border='2px'
        >
            <Flex direction='row'>
                <WebcamDialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    setImageSrc={setImageSrc}
                />

                {!isDoneList && (
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
                        <ImageUploadBox></ImageUploadBox>

                    </Flex>
                )}
                <HStack
                    align='stretch'
                    w={{ base: '90vw', sm: '80vw', md: '70vw', lg: '60vw' }}
                    overflow='scroll'
                    spacing='4px'
                >
                    {imgList && imgList.map((item) => {
                        return (
                            <Image
                                boxSize='100px'
                                objectFit='cover'
                                src={item.src}
                                alt='Dan Abramov'
                            />
                        )
                    })

                    }
                    {/* {imageSrc && (
                        <Image
                            boxSize='100px'
                            objectFit='cover'
                            src={imageSrc}
                            alt='Dan Abramov'
                        />
                    )} */}
                    <Image
                        boxSize='100px'
                        objectFit='cover'
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                    />
                </HStack>
            </Flex>
        </Box>
    )
}

export default PictureList
