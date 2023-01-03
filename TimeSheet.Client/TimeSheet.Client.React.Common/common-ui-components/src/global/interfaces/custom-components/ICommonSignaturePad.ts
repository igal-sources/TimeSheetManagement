export interface ICommonSignaturePadProps {
  name?: string
  signatureURL?: string
  signaturePopupTitle?: string
  signatureButtonSave?: string
  signatureButtonClear?: string
  signatureButtonClose?: string
  isRTL: boolean
  showSignaturePad: boolean
  closeSignaturePad: () => void
  confirmSignaturePad: (value: any) => void
}
