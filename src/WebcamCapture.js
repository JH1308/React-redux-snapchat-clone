import React, { useCallback, useRef } from "react";
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom";
import "./WebcamCapture.css";

import Webcam from "react-webcam";
import { setCameraImage } from "./features/cameraSlice";

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const videoConstraints = {
    width: 250,
    height: 400,
    faceingMode: "user",
};

function WebcamCapture() {
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory(); // Redirect

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        history.push('/preview');
    }, [webcamRef]);

    return (
        <div className="webcamCapture">
            <Webcam 
                audio={false}
                height={videoConstraints.height}
                width={videoConstraints.width}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />
            <RadioButtonUncheckedIcon 
                className="webcamCapture__button"
                onClick={capture}
                fontSize="large"
            />
        </div>
    );
}

export default WebcamCapture;