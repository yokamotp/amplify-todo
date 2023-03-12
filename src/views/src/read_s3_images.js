import React from "react";
import { Auth } from "aws-amplify";
import {
    S3Client,
    HeadObjectCommand,
    ListObjectsV2Command,
} from "@aws-sdk/client-s3";

const fetchS3Objects = async (bucket) => {
    try {
        const s3client = new S3Client({
            region: process.env.REACT_APP_S3_REGION,
            credentials: await Auth.currentCredentials(),
        });
        const output = await s3client.send(
            new ListObjectsV2Command({
                Bucket: bucket,
            })
        );
        if (!output.Contents) return [];

        const heads = [];
        for (let i = 0; i < output.Contents.length; i++) {
            const c = output.Contents[i];
            const head = await s3client.send(
                new HeadObjectCommand({
                    Bucket: bucket,
                    Key: c.Key,
                })
            );
            heads.push({ foo: decodeURIComponent(head.Metadata.foo) });
        }
        return heads;
    } catch (err) {
        console.error(err);
    }
};

export default fetchS3Objects;
