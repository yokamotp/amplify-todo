import { isMobile } from 'react-device-detect';
import {
    useEffect,
    useCallback,
    useRef,
    useImperativeHandle,
    ForwardRefRenderFunction,
    forwardRef
} from "react";


type Props = {
    width: number;
    height: number;
};

export interface WebcamHandles {
    capture: () => string | null;
}

// 撮影後の画像の理想の横幅px値を入れておく。
// 起動するカメラの性能に依存するので、このpx値で撮影されるとは限らない
const IDEAL_VIDEO_WIDTH = 1920;

const Webcam: ForwardRefRenderFunction<WebcamHandles, Props> = (
    { width, height },
    ref
) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    // 親コンポーネントからref経由で実行できるメソッドを定義
    useImperativeHandle(ref, () => ({
        // video要素で表示している画像のdataURLを返すメソッド
        capture() {
            let canvas = document.createElement("canvas");
            if (videoRef === null || videoRef.current === null) {
                return null;
            }
            const { videoWidth, videoHeight } = videoRef.current;
            canvas.width = videoWidth;
            canvas.height = videoHeight;
            const context = canvas.getContext("2d");
            if (context === null || videoRef.current === null) {
                return null;
            }
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            return canvas.toDataURL("image/jpeg");
        }
    }));

    // カメラのstreamを取得して返すメソッド
    const getStream = useCallback(async () => {
        // モバイルデバイスが縦向きの場合はアスペクト比を縦横入れ替えて指定する
        const aspectRatio = isMobile ? height / width : width / height;
        return await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment",
                width: {
                    ideal: IDEAL_VIDEO_WIDTH
                },
                aspectRatio
            },
            audio: false
        });
    }, [width, height]);

    useEffect(() => {
        let stream: MediaStream | null = null;
        let video = videoRef.current;

        // 取得したstreamをvideo要素に流す
        const setVideo = async () => {
            stream = await getStream();
            if (video === null || !stream) {
                return;
            }
            video.srcObject = stream;
            video.play();
        };

        setVideo();

        // streamを停止させる
        const cleanupVideo = () => {
            if (!stream) {
                return;
            }
            stream.getTracks().forEach((track) => track.stop());
            if (video === null) {
                return;
            }
            video.srcObject = null;
        };
        return cleanupVideo;
    }, [getStream]);

    return <video ref={videoRef} playsInline width={width} height={height} />;
};

export default forwardRef(Webcam);
