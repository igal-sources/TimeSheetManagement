import React, { useState, useCallback, useRef } from 'react'
import { Button } from '@mui/material'
import CameraAlt from '@mui/icons-material/CameraAlt'
import FlipCameraIos from '@mui/icons-material/FlipCameraIos'
import Webcam from 'react-webcam'
import { useStyles } from './CommonWebcamCaptureStyle'
import { ICommonWebcamCaptureProps } from '../../../global/interfaces'
import './common-webcam-capture.css'

const CommonWebcamCapture = ({
  name,
  isReadOnly = false,
  retakeImageTitle = 'Retake',
  captureImageTitle = 'Capture',
  imageWidth = 550,
  confirm
}: ICommonWebcamCaptureProps) => {
  const classes = useStyles()
  const webcamRef = useRef<any>({})
  const [imgSrc, setImgSrc] = useState<string>('')

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot()
    setImgSrc(imageSrc)
    confirm(imageSrc)
  }, [webcamRef, setImgSrc])

  return (
    <div className='webcam-container'>
      <div className='webcam-img'>
        {imgSrc === '' ? (
          <Webcam
            name={name}
            audio={false}
            width={imageWidth}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
          />
        ) : (
          <img alt='' src={imgSrc} />
        )}
      </div>
      <div>
        {imgSrc !== '' ? (
          <Button
            className={classes.webcam_button}
            variant='outlined'
            startIcon={<FlipCameraIos />}
            disabled={isReadOnly}
            onClick={() => {
              setImgSrc('')
            }}
          >
            {retakeImageTitle}
          </Button>
        ) : (
          <Button
            className={classes.webcam_button}
            variant='outlined'
            startIcon={<CameraAlt />}
            disabled={isReadOnly}
            onClick={capture}
          >
            {captureImageTitle}
          </Button>
        )}
      </div>
    </div>
  )
}

export default CommonWebcamCapture
