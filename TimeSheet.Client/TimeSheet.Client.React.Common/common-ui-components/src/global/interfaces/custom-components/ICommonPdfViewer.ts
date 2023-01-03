export interface ICommonPdfViewerProps {
  name?: string
  document?: any
  serverURL?: any
  PdfFileErrorTitle?: string
  PdfFileInstruction?: string
  documentWidth?: number
  documentHeight?: number
  isReadOnly: boolean
  isRTL: boolean
}