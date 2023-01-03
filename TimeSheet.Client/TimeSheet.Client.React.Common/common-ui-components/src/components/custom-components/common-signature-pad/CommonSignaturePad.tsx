import React, { useState, useEffect, useRef } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Toolbar,
  AppBar
} from '@mui/material'
import { useStyles } from './CommonSignaturePadStyle'
import SignatureCanvas from 'react-signature-canvas'
import { ICommonSignaturePadProps } from '../../../global/interfaces'
import './common-signature-pad.css'

const CommonSignaturePad = ({
  name,
  signatureURL,
  signaturePopupTitle,
  signatureButtonSave,
  signatureButtonClear,
  signatureButtonClose,
  isRTL = false,
  showSignaturePad,
  closeSignaturePad,
  confirmSignaturePad
}: ICommonSignaturePadProps) => {
  const classes = useStyles()
  const [imageURL, setImageURL] = useState<any>(null)
  const sigCanvas = useRef<any>({})

  console.log('imageURL', imageURL, signatureURL)

  const save = () => {
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'))
    confirmSignaturePad(
      sigCanvas.current.getTrimmedCanvas().toDataURL('image/png')
    )
  }

  const clearSignaturePad = () => sigCanvas.current.clear()
  const onPopupHiding = () => closeSignaturePad()

  useEffect(() => {
    if (sigCanvas.current) {
      console.log('sigCanvas.current: ', sigCanvas.current)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sigCanvas])

  return (
    <div id={name}>
      <Dialog
        open={showSignaturePad}
        onClose={(_: any, reason: string) => {
          if (reason !== 'backdropClick') {
            onPopupHiding()
          }
        }}
        maxWidth={'sm'}
      >
        <AppBar
          position='static'
          dir={isRTL ? 'rtl' : 'ltr'}
          className={classes.appBar}
        >
          <Toolbar variant='dense' className={classes.toolbar}>
            <IconButton
              edge='start'
              color='inherit'
              onClick={onPopupHiding}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogTitle>{signaturePopupTitle}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <div dir='ltr'>
            <SignatureCanvas
              ref={sigCanvas}
              canvasProps={{
                width: 500,
                height: 200,
                className: 'signatureCanvas'
              }}
            />
          </div>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            className={classes.dialogActions_Button}
            variant='outlined'
            onClick={save}
          >
            {signatureButtonSave}
          </Button>
          <Button
            className={classes.dialogActions_Button}
            variant='outlined'
            onClick={clearSignaturePad}
          >
            {signatureButtonClear}
          </Button>
          <Button
            className={classes.dialogActions_Button}
            variant='outlined'
            onClick={closeSignaturePad}
          >
            {signatureButtonClose}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CommonSignaturePad
