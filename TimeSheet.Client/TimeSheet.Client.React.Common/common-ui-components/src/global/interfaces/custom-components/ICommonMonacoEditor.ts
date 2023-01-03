export interface ICommonMonacoEditorProps {
  title?: string
  isReadOnly: boolean
  defaultLanguage?: string
  editorHeight?: string
  jsonData?: any
  onJsonChange: (newValue: any) => void
}
