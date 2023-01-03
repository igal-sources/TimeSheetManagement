import React, { useRef } from 'react'
import MonacoEditor from '@monaco-editor/react'
import { ICommonMonacoEditorProps } from '../../../global/interfaces'
import './common-monaco-editor.css'

export const CommonMonacoEditor = ({
  title,
  isReadOnly,
  defaultLanguage,
  editorHeight,
  jsonData,
  onJsonChange
}: ICommonMonacoEditorProps) => {
  const editorRef = useRef(null)
  // const [isEditorReady, setIsEditorReady] = useState<boolean>(false)

  const editorOptions = {
    readOnly: isReadOnly,
    quickSuggestions: true,
    quickSuggestionsDelay: 100
  }

  const handleEditorDidMount = (editor: any) => {
    // setIsEditorReady(true)
    editorRef.current = editor
  }

  return (
    <div className='monaco-editor-monaco-editor'>
      <div className='monaco-editor-header'>{title}</div>
      <MonacoEditor
        height={editorHeight}
        defaultLanguage={defaultLanguage}
        value={JSON.stringify(jsonData, null, '\t')}
        options={editorOptions as any}
        onChange={onJsonChange}
        onMount={handleEditorDidMount}
      />
    </div>
  )
}

export default CommonMonacoEditor
