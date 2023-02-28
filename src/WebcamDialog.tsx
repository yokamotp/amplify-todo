import { useState, useRef } from "react";
import styled from "styled-components";
import Webcam, { WebcamHandles } from "./Webcam";
import useWindowSize from "./useWindowSize";
import useWindowEvent from "./useWindowEvent";

const WindowSizedDialog = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
`;

const WindowSizedDialogInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CaptureButton = styled.button`
  position: absolute;
  width: 100px;
  height: 30px;
  bottom: 30px;
  right: 0;
  left: 0;
  margin: auto;
`;

type Props = {
    open: boolean;
    onClose: () => void;
    setImageSrc: (imageSrc: string) => void;
};

const WebcamDialog = ({ open, onClose, setImageSrc }: Props) => {
    const webcamRef = useRef<WebcamHandles | null>(null);
    const { width, height } = useWindowSize();

    const [isLandscape, setIsLandscape] = useState(false);

    const orientationChanged = () => {
        const screen = window.screen;
        let angle = screen && screen.orientation && screen.orientation.angle;
        if (angle === undefined) {
            // iOS用検知
            angle = window.orientation;
        }
        if (angle !== 0) {
            setIsLandscape(true);
            return;
        }
        setIsLandscape(false);
    };

    useWindowEvent("orientationchange", orientationChanged, []);

    const capture = () => {
        if (!webcamRef.current) {
            return;
        }
        const newImageSrc = webcamRef.current.capture();
        if (!newImageSrc) {
            return;
        }
        setImageSrc(newImageSrc);
        onClose();
    };

    if (!open || width === undefined || height === undefined) {
        return null;
    }

    if (isLandscape) {
        return <div>縦向きにしてください</div>;
    }

    return (
        <WindowSizedDialog>
            <WindowSizedDialogInner>
                <Webcam ref={webcamRef} width={width} height={height} />
                <CaptureButton onClick={capture}>capture</CaptureButton>
            </WindowSizedDialogInner>
        </WindowSizedDialog>
    );
};

export default WebcamDialog;
