export interface ICommonWebcamCaptureProps {
  name?: string
  imageURL?: string
  retakeImageTitle?: string
  captureImageTitle?: string
  imageWidth?: number
  isReadOnly: boolean
  confirm: (value: any) => void
}